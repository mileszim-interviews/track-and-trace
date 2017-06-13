import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),

  // Associations
  bookingOrigins: DS.hasMany('booking', { inverse: 'origin' }),
  bookingDestinations: DS.hasMany('booking', { inverse: 'destination' }),

  // Helpers
  code: Ember.computed.alias('id'),
  bookings: Ember.computed.union('bookingOrigins', 'bookingDestinations')
});
