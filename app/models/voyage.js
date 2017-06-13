import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  // Associations
  bookings: DS.hasMany('booking'),
  vessel: DS.belongsTo('vessel'),
  containers: DS.hasMany('container'),

  // Helpers
  code: Ember.computed.alias('id'),
  totalContainers: Ember.computed('containers.[]', function() {
    return this.get('containers.[].length');
  })
});
