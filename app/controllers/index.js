import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),
  fetchBooking: Ember.inject.service('fetch-booking'),
  foundReference: null,

  referenceNumber(fullReferenceNumber = '') {
    return fullReferenceNumber.replace('PABV', '');
  },

  findReference: task(function * (form) {
    try {
      const fullReferenceNumber = form.get('fullReferenceNumber');
      //let booking = yield this.get('store').findRecord('booking', fullReferenceNumber);
      let referenceNumber = this.referenceNumber(fullReferenceNumber);
      let bookingInfo = yield this.get('fetchBooking').get('fetch').perform(referenceNumber);
      console.log(bookingInfo);
    } catch(error) {
      console.log(error);
    }
  }).drop(),

  updateLocalReference: task(function * (booking) {
    try {
      let bookingNeedsRefresh = yield this.get('needsRefresh').perform(booking);
      if (bookingNeedsRefresh) {
        let referenceNumber = yield booking.get('referenceNumber');
        let bookingInfo = yield this.get('fetchBooking').fetch(referenceNumber);
        // continue
      }
    } catch(error) {
      console.log(error);
    }
  }),

  needsRefresh: task(function * (booking) {
    const bookingDate = yield booking.get('date');
    const fourHours = 4 * 1000 * 60 * 60;
    const fourHoursAgo = Date.now() - fourHours;
    const isOverFourHoursOld = (Date.now() - bookingDate) > fourHoursAgo;
    if (isOverFourHoursOld) { return true; }
    return false;
  })
});
