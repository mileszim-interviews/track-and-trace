import { moduleForModel, test } from 'ember-qunit';

moduleForModel('steamship-line', 'Unit | Model | steamship line', {
  // Specify the other units that are required for this test.
  needs: ['model:booking']
});

test('it has attr: name', function(assert) {
  let model = this.subject();
  let hasAttr = Object.keys(model.toJSON()).indexOf('name') > -1;
  assert.ok(hasAttr);
});
