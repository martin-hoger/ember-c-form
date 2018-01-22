import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-form-field-input-checkbox', 'Integration | Component | c-form-field-input-checkbox', {
  integration: true,
});

test('Input value', function(assert) {
  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },  
    field : false
  });

  var testCheckbox = function(localThis, defaultStatus){
    //Set default value of checkbox.
    if (defaultStatus == 'default-on') {
      localThis.$('div').find('.x-toggle-flip').click();
    }

    //Test - start value - checkbox is set on.
    localThis.render(hbs`{{c-form-field-input-checkbox model=model field="field"}}`);
    assert.equal((localThis.$('div').find('.x-toggle-container').attr('class').search('x-toggle-container-checked') == '-1'), true);

    //Test - checkbox is toggle to off.
    //When value is '0' then it is necessary to switch to false.
    let value = (localThis.get('model.field') !== '0') ? localThis.get('model.field') : false;
    localThis.$('div').find('.x-toggle-flip').click();
    assert.equal((localThis.$('div').find('.x-toggle-container').attr('class').search('x-toggle-container-checked') >= 0), true);

    //Test - model is toggle to off too.
    assert.equal(localThis.get('model.field'), !(value));
  };

  //Test all - checkbox is set to ON.
  let assertTo0 = ['0', 0, false];
  assertTo0.forEach((value) => {
    this.set('model.field', value);
    testCheckbox(this, 'default-off');
  });

  //Test all - checkbox is set to OFF.
  let assertTo1 = ['1', 1, true, 'hello'];
  assertTo1.forEach((value) => {
    this.set('model.field', value);
    testCheckbox(this, 'default-on');
  });

  //Test - defined strings for set on and set off values.
  this.set('model.field', "yes");
  this.render(hbs`{{c-form-field-input-checkbox model=model field="field" valueOn="yes" valueOff="no"}}`);
  assert.equal(this.get('model.field'), "yes");
  this.$('div').find('.x-toggle-flip').click();
  assert.equal(this.get('model.field'), "no");

  //Test - external action.
  this.set('externalAction', (data) => {
    assert.equal(data, 'test23');
  });
  this.render(hbs`{{c-form-field-input-checkbox model=model field="field" action=(action externalAction "test23")}}`);
  this.$('div').find('.x-toggle-flip').click();

});

