import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  lastUpdated: DS.attr('date'),

  // Associations
  steamshipLine: DS.belongsTo('steamship-line'),
  origin: DS.belongsTo('port'),
  destination: DS.belongsTo('port'),
  vessel: DS.belongsTo('vessel'),
  voyage: DS.belongsTo('voyage'),
  containers: DS.hasMany('container'),

  // Helpers
  referenceNumber: Ember.computed('id', function() {
    return this.get('id').replace('PABV', '');
  })
});
