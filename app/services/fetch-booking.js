import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Service.extend({
  ajax: Ember.inject.service('ajax'),
  store: Ember.inject.service('store'),

  existingBooking(referenceNumber) {
    return this.get('store').findRecord('booking', `PABV${referenceNumber}`);
  },

  fetch: task(function * (referenceNumber) {
    try {
      let response = yield this.get('ajax').request('/fetchBooking', {
        method: 'GET',
        data: { referenceNumber: referenceNumber }
      });
      let booking = yield this.get('parseResponse').perform(response);
      return booking;
    } catch(error) {
      console.log(error);
    }
  }).drop(),

  parseResponse: task(function * (response) {
    let booking = yield this.get('parseBooking').perform(response);
    let origin = yield this.get('parseOrigin').perform(response);
    let destination = yield this.get('parseDestination').perform(response);
    let vessel = yield this.get('parseVessel').perform(response);
    let voyage = yield this.get('parseVoyage').perform(response);
    let containers = yield this.get('parseContainers').perform(response);

    yield origin.get('bookingOrigins').addObject(booking);
    yield destination.get('bookingDestinations').addObject(booking);
    yield vessel.get('bookings').addObject(booking);
    yield vessel.get('voyages').addObject(voyage);
    yield voyage.get('bookings').addObject(booking);
    yield voyage.set('vessel', vessel);
    // debugger;
    // containers.forEach((container) => {
    //   debugger;
    //   voyage.get('containers').addObject(container);
    //   debugger;
    //   container.setProperties({
    //     booking: booking,
    //     vessel: vessel,
    //     voyage: voyage
    //   });
    //   yield container.save();
    //   yield voyage.save();
    // });


    yield origin.save();
    yield destination.save();
    yield vessel.save();
    yield voyage.save();

    yield booking.setProperties({
      origin: origin,
      destination: destination,
      vessel: vessel,
      voyage: voyage,
      //containers: containers
    });

    yield booking.save();

    return booking;
  }),

  parseBooking: task(function * (response) {
    try {
      let existingBooking = yield this.existingBooking(response.id);
      return existingBooking;
    } catch(error) {
      let newBooking = yield this.get('store').createRecord('booking', {
        id: response.id
      });
      yield newBooking.save();
      return newBooking;
    }
  }),

  parseOrigin: task(function * (response) {
    let origin = response.origin;
    try {
      let existingOrigin = yield this.get('store').findRecord('port', origin.id);
      return existingOrigin;
    } catch(error) {
      yield this.get('store').adapterFor('application').clearCache('port');
      let newOrigin = yield this.get('store').createRecord('port', origin);
      yield newOrigin.save();
      return newOrigin;

    }
  }),

  parseDestination: task(function * (response) {
    let destination = response.destination;
    try {
      let existingDestination = yield this.get('store').findRecord('port', destination.id);
      return existingDestination;
    } catch(error) {
      yield this.get('store').adapterFor('application').clearCache('port');
      let newDestination = yield this.get('store').createRecord('port', destination);
      yield newDestination.save();
      return newDestination;
    }
  }),

  parseVessel: task(function * (response) {
    let vessel = response.vessel;
    try {
      let existingVessel = yield this.get('store').findRecord('vessel', vessel.id);
      return existingVessel;
    } catch(error) {
      yield this.get('store').adapterFor('application').clearCache('vessel');
      let newVessel = yield this.get('store').createRecord('vessel', vessel);
      yield newVessel.save();
      return newVessel;
    }
  }),

  parseVoyage: task(function * (response) {
    let voyage = response.voyage;
    try {
      let existingVoyage = yield this.get('store').findRecord('voyage', voyage.id);
      return existingVoyage;
    } catch(error) {
      yield this.get('store').adapterFor('application').clearCache('voyage');
      let newVoyage = yield this.get('store').createRecord('voyage', voyage);
      yield newVoyage.save();
      return newVoyage;
    }
  }),

  parseContainers: task(function * (response) {
    let containerData = response.containers || [];
    try {
      let containerArray = yield containerData.map(function * (container) {
        try {
          let existingContainer = yield this.get('store').findRecord('container', container.id);
          return existingContainer;
        } catch(error) {
          yield this.get('store').adapterFor('application').clearCache('container');
          let newContainer = yield this.get('store').createRecord('container', container);
          yield newContainer.save();
          return newContainer;
        }
      });
      return containerArray;
    } catch(error) {
      console.log(error);
    }
  })
});
