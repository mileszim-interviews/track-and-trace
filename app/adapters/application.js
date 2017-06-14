import FirebaseAdapter from 'emberfire/adapters/firebase';

export default FirebaseAdapter.extend({
  clearCache(model) {
    this.store._identityMap.retrieve(model).clear();
    this.store._identityMap.retrieve(model)._idToModel = {}
  }
});
