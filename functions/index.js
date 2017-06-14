const functions = require('firebase-functions');
const rp = require('request-promise-native');
const cheerio = require('cheerio');

exports.fetchBooking = functions.https.onRequest((req, res) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Methods', 'GET');

  const ENDPOINT = "https://www.pilship.com/shared/ajax/";
  const referenceNumber = req.query.referenceNumber;

  if (!referenceNumber) {
    console.error("No referenceNumber param given");
    res.status(400).send("No referenceNumber param given");
  }

  let options = {
    uri: ENDPOINT,
    qs: {
      fn: 'get_tracktrace_bl',
      ref_num: referenceNumber
    }
  };

  rp(options).then((booking) => {
    booking = JSON.parse("{" + booking.match(/(\"data\"\:.+)/)[0]); // coerce into json form
    let data = booking.data;
    if (!!data["err_msg"]) {
      throw new Error(data["err_msg"]);
    }

    let bookingResponse = {
      id: null,
      origin: {},
      destination: {},
      vessel: {},
      voyage: {},
      containers: []
    };

    // Reference Number for good measure
    bookingResponse.id = cheerio.load(data.refnum_info).text().replace('B/L Number: ', '');

    // Parse schedule table
    let schedule = cheerio.load(data["scheduletable"], { xmlMode: true });
    if (schedule('.arrival-delivery').html().includes('<br/>')) {
      bookingResponse.voyage.arrival = schedule('.arrival-delivery').html().split('<br/>').slice(-1)[0];
    }
    if(schedule('.location').html().includes('<br/>')) {
      var parsed = schedule('.location').html().split('<br/>');
      bookingResponse.origin.id = parsed[2];
      bookingResponse.origin.name = parsed[1];
    }
    if(schedule('.vessel-voyage').html().includes('<br/>')) {
      var parsed = schedule('.vessel-voyage').html().split('<br/>');
      bookingResponse.vessel.id = parsed[1].toLowerCase().replace(' ', '-');
      bookingResponse.vessel.name = parsed[1];
      bookingResponse.voyage.id = parsed[2];
    }
    if(schedule('.next-location').html().includes('<br/>')) {
      var parsedLocation = schedule('.next-location').html().split('<br/>');
      bookingResponse.destination.id = parsedLocation[2];
    }

    // Parse scheduleinfo
    let scheduleinfo = cheerio.load(data["scheduleinfo"], { xmlMode: true });
    if (scheduleinfo.html().includes('<br/>')) {
      var destinationName = scheduleinfo.html().split('<br/>').find((item) => item.includes('Place of Delivery'));
      var destination = cheerio.load(destinationName)('b').text()
      destinationName = destination.match(/^(.+)\ \[/);
      var destinationID = destination.match(/\[(.+)\]/);
      bookingResponse.destination.id = destinationID[1];
      bookingResponse.destination.name = destinationName[1];
    }

    // Parse containers
    let containers = cheerio.load(data.containers, { xmlMode: true });
    containers('.resultrow').each((i, row) => {
      bookingResponse.containers.push({});
      let r = cheerio.load(row, { xmlMode: true });
      if (r('.container-num').text()) {
        bookingResponse.containers[i].id = r('.container-num').text().trim().replace(' Trace', '');
      }
      if (r('.container-type').text()) {
        bookingResponse.containers[i].size = r('.container-type').text().match(/^(\d+)/)[0];
        bookingResponse.containers[i].kind = r('.container-type').text().match(/([a-zA-Z]+)$/)[0];
        bookingResponse.containers[i].movement = r('.movement').text();
        bookingResponse.containers[i].latestEvent = r('.latest-event').text();
      }
    });

    res.status(200).json(bookingResponse);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Something went wrong");
  });
});
