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

test('referenceNumber removes PABV', function(assert) {
  let model = this.subject();
  model.set('id', 'PABVTXG790195200')
  assert.equal(model.get('referenceNumber'), 'TXG790195200');
});
