import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-form-field-input-radio', 'Integration | Component | c-form-field-input-radio', {
  integration: true,
});

test('Input value', function(assert) {
  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },  
    field : 1
  });
  //Radio options.
  this.set('options',
      [{ id: 0, value: 'no' },
       { id: 1, value: 'yes' }],
  );

  //render component.
  this.render(hbs`{{c-form-field-input-radio options=options label='Radio label' model=model field="field"}}`);

  //Test - default checked value.
  assert.equal(this.$('input:checked').val(), 1);
  //Test - showing label.
  assert.equal(this.$('div.fields').find('div.field:first-child').find('label').text(), 'no');
  assert.equal(this.$('div.fields').find('div.field:last-child').find('label').text(), 'yes');
  //Test - change radio option.
  this.set('model.field', 0);
  assert.equal(this.$('input:checked').val(), 0);

});

