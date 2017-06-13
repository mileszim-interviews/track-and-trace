import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('booking', params.booking_id);
  },

  titleToken(model) {
    return model.get('referenceNumber');
  }
});
