import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Service.extend({
  ajax: Ember.inject.service('ajax'),

  fetch: task(function * (referenceNumber) {
    try {
      let response = yield this.get('ajax').request('/shared/ajax/', {
        method: 'GET',
        data: {
          fn: 'get_tracktrace_bl',
          ref_num: referenceNumber
        }
      });
      let parsedResponse = yield this.get('parseResponse').perform(response);
      return parsedResponse;
    } catch(error) {
      console.log(error);
    }
  }),

  parseResponse: task(function * (response) {
    console.log("GOT RESPONSE:");
    console.log(response);
    return response;
  })
});
