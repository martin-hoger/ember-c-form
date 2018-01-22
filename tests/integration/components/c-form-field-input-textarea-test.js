import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-form-field-input-textarea', 'Integration | Component | c-form-field-input-textarea', {
  integration: true,
});

test('Input value', function(assert) {
  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },  
    field : 'test23'
  });

  //Render component template.
  this.render(hbs`{{c-form-field-input-textarea model=model field="field" disabled="disabled"}}`);

  //Test - fill value by model.
  assert.equal(this.$('div').find('textarea').val(), this.get('model.field'));
  
  //Test - fill value by text input.
  this.$('div').find('textarea').val(174);
  assert.equal(this.$('div').find('textarea').val(), 174);
  
  //Test - disabled input.
  assert.equal(this.$('div').find('textarea').attr('disabled'), "disabled");
});

