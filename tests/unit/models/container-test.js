import { moduleForModel, test } from 'ember-qunit';

moduleForModel('container', 'Unit | Model | container', {
  // Specify the other units that are required for this test.
  needs: ['model:booking', 'model:vessel', 'model:voyage']
});

test('it has attr: size', function(assert) {
  let model = this.subject();
  let hasAttr = Object.keys(model.toJSON()).indexOf('size') > -1;
  assert.ok(hasAttr);
});

test('it has attr: kind', function(assert) {
  let model = this.subject();
  let hasAttr = Object.keys(model.toJSON()).indexOf('kind') > -1;
  assert.ok(hasAttr);
});

test('containerNumber is equal to container id', function(assert) {
  let model = this.subject();
  model.set('id', 'some_id');
  assert.equal(model.get('containerNumber'), model.get('id'));
});
