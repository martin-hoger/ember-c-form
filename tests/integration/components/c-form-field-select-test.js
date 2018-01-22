import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers';

import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';

registerPowerSelectHelpers();

moduleForComponent('c-form-field-select', 'Integration | Component | c-form-field-select', {
  integration: true,
});

test('Input value', function(assert) {

  /* ########### Input options is array. ########### */
  
  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },  
    field : 'Bus',
  });

  //Render template.
  this.render(hbs`{{c-form-field-select label="Some label" model=model field="field" options=(array "Airplane" "Car" "Rocket") description='Travel'}}`); 

  //Test - Default pre-set value.
  assert.equal((this.$('div').find('.ember-power-select-selected-item').text().search('Bus') >=0 ), true);

  //Test - view options.
  clickTrigger();
  assert.equal((parent.$('ul.ember-power-select-options').find('li:first-child').text().search('Airplane') >= 0), true);
  assert.equal((parent.$('ul.ember-power-select-options').find('li:last-child').text().search('Rocket') >= 0), true);

  //Set new option.
  selectChoose('', 'Car');
  //Test - selected new option.
  assert.equal((this.$('div').find('.ember-power-select-selected-item').text().search('Car') >=0 ), true);

  //Test - selected new option => model is changed.
  assert.equal((this.get('model.field').search('Car') >= 0 ), true);


  /* ########### Input options is object. ########### */
  
  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },  
    field : { id : 2, value : 'Train'}
  });

  //Set options.
  this.set('options',
    [{ id: 1, value: 'Ship' },
     { id: 2, value: 'Train' },
     { id: 3, value: 'Truck' },
     { id: 4, value: 'Bike' }]
  );
  //Render template.
  this.render(hbs`{{#c-form-field-select label="Some label" model=model field="field" description='Travel' options=options as |option|}}{{option.value}}{{/c-form-field-select}}`); 

  //Test - Default pre-set value.
  assert.equal((this.$('div').find('.ember-power-select-selected-item').text().search('Train') >=0), true);

  //Test - view options.
  clickTrigger();
  assert.equal((parent.$('ul.ember-power-select-options').find('li:first-child').text().search('Ship') >= 0), true);
  assert.equal((parent.$('ul.ember-power-select-options').find('li:last-child').text().search('Bike') >= 0), true);

  //Set new option.
  selectChoose('', 'Truck');
  //Test - selected new option.
  assert.equal((this.$('div').find('.ember-power-select-selected-item').text().search('Truck') >=0 ), true);

});

