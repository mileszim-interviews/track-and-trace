import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),

  // Associations
  bookings: DS.hasMany('booking'),
  voyages: DS.hasMany('voyage'),

  // Helpers
  code: Ember.computed.alias('id')
});
