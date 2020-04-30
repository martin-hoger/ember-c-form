//
// More info about creating the tests.
// https://basecamp.com/2251989/projects/3309995/documents/14915014
// 

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { render, click } from '@ember/test-helpers';
import { pauseTest } from '@ember/test-helpers';

import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';
registerPowerSelectHelpers();

module('Integration | Component | c-form-field-select', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  const optionsObjects = [
    { id: 1, value: 'Airplane' },
    { id: 2, value: 'Car' },
    { id: 3, value: 'Rocket' },
  ];

  const optionsArray = ['Airplane', 'Car', 'Rocket'];

  test('Initial value - one of the options', async function(assert) {
    this.set('model', { field : optionsArray[1] });
    this.set('options', optionsArray);
    //Render template.
    await render(hbs`{{c-form-field-select model=model field="field" options=options}}`); 
    assert.dom('.ember-power-select-trigger').hasText(optionsArray[1], 'The value is selected');
  });

  test('Initial value - none of the options', async function(assert) {
    this.set('model', { field : 'Bus' });
    this.set('options', optionsArray);
    //Render template.
    await render(hbs`{{c-form-field-select model=model field="field" options=options}}`); 
    assert.dom('.ember-power-select-trigger').hasText('Bus', 'The value is dispyed');
  });

  test('Open the dropdown', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsArray);
    //Render template.
    await render(hbs`{{c-form-field-select model=model field="field" options=options}}`); 
    assert.dom('.ember-power-select-dropdown').doesNotExist('Dropdown is not rendered');
    // Open the dropdown
    await clickTrigger();
    assert.dom('.ember-power-select-dropdown').exists('Dropdown is opened');
    // Check all the options.
    this.options.forEach((option, index) => {
      assert.dom('.ember-power-select-options li:nth-child(' + (index + 1) + ')').hasText(option);
    });
    // Close the dropdown
    await clickTrigger();
    assert.dom('.ember-power-select-dropdown').doesNotExist('Dropdown was closed');
  });

  test('Select an options - manualy select a value', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`
      {{#c-form-field-select model=model field="field" options=options as |item|}}
        {{item.value}}
      {{/c-form-field-select}}
     `); 
    // Select one option.
    await selectChoose('.ember-power-select-trigger', optionsObjects[1].value);
    assert.dom('.ember-power-select-trigger').hasText(optionsObjects[1].value, 'The value has been selected #1');
    assert.equal(this.get('model.field.id'), optionsObjects[1].id, 'Model was set #1');
    // Select another options by click.
    await clickTrigger();
    await click('.ember-power-select-option:nth-child(1)'); // index + 1
    assert.dom('.ember-power-select-trigger').hasText(optionsObjects[0].value, 'The value has been selected #2');
    // Test if the model is also set.
    assert.equal(this.get('model.field.id'), optionsObjects[0].id, 'Model was set #2');
  });

  test('Select an options - changing filed value', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsArray);
    //Render template.
    await render(hbs`{{c-form-field-select model=model field="field" options=options}}`); 
    this.set('model.field', optionsArray[1]);
    assert.dom('.ember-power-select-trigger').hasText(optionsArray[1], 'The value is selected');
  });

  test('Select an option - fire action', async function(assert) {
    assert.expect(2);
    this.set('options', optionsObjects);
    this.set('model', { field : null });
    //Test - external action.
    this.set('externalAction', (data) => {
      assert.equal(data.id, this.options[1].id, 'External event fired');
    });
    //Render template.
    await render(hbs`
      {{#c-form-field-select model=model field="field" options=options onSelect=(action externalAction) as |item|}}
        {{item.value}}
      {{/c-form-field-select}}
    `); 
    await selectChoose('.ember-power-select-trigger', optionsObjects[1].value);
    assert.dom('.ember-power-select-trigger').hasText(optionsObjects[1].value, 'The value has been selected');
  });

  test('Allow clear - removes value', async function(assert) {
    this.set('model', { field : optionsObjects[1] });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`
      {{#c-form-field-select model=model field="field" options=options allowClear=true as |item|}}
        {{item.value}}
      {{/c-form-field-select}}
    `); 
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[1].value, 'The value is selected');
    await click('.ember-power-select-clear-btn'); 
    assert.dom('.ember-power-select-trigger').hasText(/\s*/, 'No text present');
    assert.equal(this.get('model.field'), null, 'Field is set to null');
  });

  test('Select multiple options - change field value', async function(assert) {
    this.set('model', { field : [ optionsObjects[1], optionsObjects[2]] });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`
      {{#c-form-field-select model=model field="field" options=options multiple=true as |item|}}
        {{item.value}}
      {{/c-form-field-select}}
    `); 
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[1].value, 'The value #1 is present');
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[2].value, 'The value #2 is present');
    assert.equal(this.get('model.field')[0].id, optionsObjects[1].id , 'Value #1 is set on the model');
    assert.equal(this.get('model.field')[1].id, optionsObjects[2].id , 'Value #2 is set on the model');
    // this.get('model.field').removeObject(optionsObjects[2]);
    this.get('model.field').removeObject(optionsObjects[1]);
    this.get('model.field').pushObject(optionsObjects[0]);
    // We need a small wait here, the select works perfectly,
    // but the test was failing.
    await clickTrigger(); 
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[0].value, 'The value #0 is present');
    assert.dom('.ember-power-select-trigger').doesNotIncludeText(optionsObjects[1].value, 'Value #2 is removed');
    assert.equal(this.get('model.field')[0].id, optionsObjects[2].id , 'Value #2 is set on the model');
    assert.equal(this.get('model.field')[1].id, optionsObjects[0].id , 'Value #0 is set on the model');
    // await pauseTest();
  });

  test('Select multiple options - manualy select value', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`
      {{#c-form-field-select model=model field="field" options=options multiple=true as |item|}}
        {{item.value}}
      {{/c-form-field-select}}
    `); 
    // Select one option.
    await selectChoose('.ember-power-select-trigger', optionsObjects[1].value);
    await selectChoose('.ember-power-select-trigger', optionsObjects[2].value);
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[1].value, 'The value #1 is present');
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[2].value, 'The value #2 is present');
    assert.equal(this.get('model.field')[0].id, optionsObjects[1].id , 'Value #2 is set on the model');
    assert.equal(this.get('model.field')[1].id, optionsObjects[2].id , 'Value #0 is set on the model');
    await clickTrigger();
    await click('.ember-power-select-option:nth-child(1)'); // index + 1
    assert.equal(this.get('model.field')[2].id, optionsObjects[0].id , 'Value #0 is set on the model');
    // await pauseTest();
  });

});

