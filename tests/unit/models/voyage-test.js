import { moduleForModel, test, skip } from 'ember-qunit';

moduleForModel('voyage', 'Unit | Model | voyage', {
  // Specify the other units that are required for this test.
  needs: ['model:booking', 'model:vessel', 'model:container']
});

test('code is equal to voyage id', function(assert) {
  let model = this.subject();
  model.set('id', 'some_id');
  assert.equal(model.get('code'), model.get('id'));
});

skip('totalContainers is equal to the number of containers', function(assert) {
  assert.ok(true);
});
