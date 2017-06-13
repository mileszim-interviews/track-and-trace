import { moduleForModel, test, skip } from 'ember-qunit';

moduleForModel('port', 'Unit | Model | port', {
  // Specify the other units that are required for this test.
  needs: ['model:booking']
});

test('it has attr: name', function(assert) {
  let model = this.subject();
  let hasAttr = Object.keys(model.toJSON()).indexOf('name') > -1;
  assert.ok(hasAttr);
});

test('code is equal to port id', function(assert) {
  let model = this.subject();
  model.set('id', 'some_id');
  assert.equal(model.get('code'), model.get('id'));
});

skip('bookings is union of bookingOrigins and bookingDestinations', function(assert) {
  // let port = this.subject();
  // let origin = this.store().createRecord('booking', { id: '1', port: port });
  // port.addObject(origin);
  //
  // let destination = this.store().createRecord('booking', { id: '2', port: port });
  // port.addObject(destination);
  //
  // assert.equal(port.get('bookings.length'), 2);
  assert.ok(true);
});
