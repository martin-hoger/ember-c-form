import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-form-field-input-text', 'Integration | Component | c-form-field-input-text', {
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
  this.render(hbs`{{c-form-field-input-text model=model field="field" disabled="disabled"}}`);

  //Test - fill value by model.
  assert.equal(this.$('div').find('input').val(), this.get('model.field'));
  
  //Test - fill value by text input.
  this.$('div').find('input').val(174);
  assert.equal(this.$('div').find('input').val(), 174);
  
  //Test - disabled input.
  assert.equal(this.$('div').find('input').attr('disabled'), "disabled");
  
  //Test - external action.
  this.set('externalAction', (data) => {
    assert.equal(data, 'test23');
  });
  this.render(hbs`{{c-form-field-input-text model=model field="field" action=(action externalAction "test23")}}`);
  this.$('input').keyup();
});

