import { moduleForModel, test } from 'ember-qunit';

moduleForModel('booking', 'Unit | Model | booking', {
  // Specify the other units that are required for this test.
  needs: [
    'model:steamship-line',
    'model:port',
    'model:vessel',
    'model:voyage',
    'model:container'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
