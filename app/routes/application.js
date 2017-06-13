import Ember from 'ember';

export default Ember.Route.extend({
  title(tokens) {
    return (tokens.length ? tokens.reverse().join(' - ') + ' - ' : '') + 'Track & Trace';
  },
});
