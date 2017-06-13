import DS from 'ember-data';

export default DS.Model.extend({
  // Associations
  steamshipLine: DS.belongsTo('steamship-line'),
  origin: DS.belongsTo('port'),
  destination: DS.belongsTo('port'),
  vessel: DS.belongsTo('vessel'),
  voyage: DS.belongsTo('voyage'),
  containers: DS.hasMany('container')
});
