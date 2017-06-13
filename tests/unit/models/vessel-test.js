import { moduleForModel, test } from 'ember-qunit';

moduleForModel('vessel', 'Unit | Model | vessel', {
  // Specify the other units that are required for this test.
  needs: ['model:booking', 'model:voyage']
});

test('it has attr: name', function(assert) {
  let model = this.subject();
  let hasAttr = Object.keys(model.toJSON()).indexOf('name') > -1;
  assert.ok(hasAttr);
});

test('code is equal to vessel id', function(assert) {
  let model = this.subject();
  model.set('id', 'some_id');
  assert.equal(model.get('code'), model.get('id'));
});
