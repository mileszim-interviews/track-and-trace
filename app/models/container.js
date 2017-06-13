import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  size: DS.attr('number'),
  kind: DS.attr('string'),

  // Associations
  booking: DS.belongsTo('booking'),
  vessel: DS.belongsTo('vessel'),
  voyage: DS.belongsTo('voyage'),

  // Helpers
  containerNumber: Ember.computed.alias('id')
});
