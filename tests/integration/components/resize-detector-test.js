import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

const {
  String: { htmlSafe },
  run: { later }
} = Ember;

moduleForComponent('resize-detector', 'Integration | Component | resize detector', {
  integration: true
});

test('it triggers an action when target changes sizes', function(assert){

  assert.expect(2);

  this.set('style', htmlSafe('width: 300px; height: 300px;'));

  let received;
  this.on('resized', function(lastSize){
    received = lastSize;
  });

  this.render(hbs`
    {{resize-detector '#square' on-resize=(action 'resized')}}
    <div id="square" style={{style}}></div>
  `);

  later(() => {
    assert.deepEqual(received, { width: 300, height: 300 }, 'initial render caused size to be received');

    this.set('style', htmlSafe('width: 200px; height: 200px;'));
  }, 20);

  later(() => {
    assert.deepEqual(received, { width: 200, height: 200 }, 'received updated size');
  }, 70);

  return wait();
});
