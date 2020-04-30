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
// import { pauseTest } from '@ember/test-helpers';

import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';
registerPowerSelectHelpers();

module('Integration | Component | c-form-field-select-simple', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  const optionsObjects = [
    { id: 1, value: 'Value #0' },
    { id: 2, value: 'Value #1' },
    { id: 3, value: 'Value #2' },
  ];

  const optionsObjects2 = [
    { key: 1, name: 'Value #0' },
    { key: 2, name: 'Value #1' },
    { key: 3, name: 'Value #2' },
  ];

  test('Initial value - one of the options', async function(assert) {
    this.set('model', { field : optionsObjects[1].id });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`{{c-form-field-select-simple model=model field="field" options=options}}`); 
    assert.dom('.ember-power-select-trigger').hasText(optionsObjects[1].value, 'The value is selected');
  });

  test('Initial value - none of the options', async function(assert) {
    this.set('model', { field : 30 });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`{{c-form-field-select-simple model=model field="field" options=options}}`); 
    assert.dom('.ember-power-select-trigger').hasText(/\s*/, 'No text present');
  });

  test('Open the dropdown', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`{{c-form-field-select-simple model=model field="field" options=options}}`); 
    assert.dom('.ember-power-select-dropdown').doesNotExist('Dropdown is not rendered');
    // Open the dropdown
    await clickTrigger();
    assert.dom('.ember-power-select-dropdown').exists('Dropdown is opened');
    // Check all the options.
    this.options.forEach((option, index) => {
      assert.dom('.ember-power-select-options li:nth-child(' + (index + 1) + ')').hasText(option.value);
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
      {{#c-form-field-select-simple model=model field="field" options=options as |item|}}
        {{item.value}}
      {{/c-form-field-select-simple}}
     `); 
    // Select one option.
    await selectChoose('.ember-power-select-trigger', optionsObjects[1].value);
    assert.dom('.ember-power-select-trigger').hasText(optionsObjects[1].value, 'The value has been selected #1');
    assert.equal(this.get('model.field'), optionsObjects[1].id, 'Model was set #1');
    // Select another options by click.
    await clickTrigger();
    await click('.ember-power-select-option:nth-child(1)'); // index + 1
    assert.dom('.ember-power-select-trigger').hasText(optionsObjects[0].value, 'The value has been selected #2');
    // Test if the model is also set.
    assert.equal(this.get('model.field'), optionsObjects[0].id, 'Model was set #2');
  });

  test('Select an options - changing field value', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`{{c-form-field-select-simple model=model field="field" options=options}}`); 
    assert.dom('.ember-power-select-trigger').hasText(/\s*/, 'No text present');
    this.set('model.field', optionsObjects[1].id);
    assert.dom('.ember-power-select-trigger').hasText(optionsObjects[1].value, 'The value is selected');
  });

  test('Select an option - fire action', async function(assert) {
    assert.expect(2);
    this.set('options', optionsObjects);
    this.set('model', { field : null });
    //Test - external action.
    this.set('externalAction', (data) => {
      assert.equal(data, this.options[1].id, 'External event fired');
    });
    //Render template.
    await render(hbs`
      {{#c-form-field-select-simple model=model field="field" options=options onSelect=(action externalAction) as |item|}}
        {{item.value}}
      {{/c-form-field-select-simple}}
     `); 
    await selectChoose('.ember-power-select-trigger', optionsObjects[1].value);
    assert.dom('.ember-power-select-trigger').hasText(optionsObjects[1].value, 'The value has been selected');
  });

  test('Select multiple options - change field value', async function(assert) {
    this.set('model', { field : [ optionsObjects[1].id, optionsObjects[2].id] });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`
      {{#c-form-field-select-simple model=model field="field" options=options multiple=true as |item|}}
        {{item.value}}
      {{/c-form-field-select-simple}}
    `); 
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[1].value, 'The value #1 is present');
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[2].value, 'The value #2 is present');
    assert.equal(this.get('model.field')[0], optionsObjects[1].id , 'Value #1 is set on the model');
    assert.equal(this.get('model.field')[1], optionsObjects[2].id , 'Value #2 is set on the model');
    this.get('model.field').pushObject(optionsObjects[0].id);
    // We need a small wait here, the select works perfectly,
    // but the test was failing.
    await clickTrigger(); 
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[0].value, 'The value #0 is present');
    assert.equal(this.get('model.field')[2], optionsObjects[0].id , 'Value #0 is set on the model');
    // await pauseTest();
  });

  test('Select multiple options - manualy select value', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsObjects);
    //Render template.
    await render(hbs`
      {{#c-form-field-select-simple model=model field="field" options=options multiple=true as |item|}}
        {{item.value}}
      {{/c-form-field-select-simple}}
    `); 
    // Select one option.
    await selectChoose('.ember-power-select-trigger', optionsObjects[1].value);
    await selectChoose('.ember-power-select-trigger', optionsObjects[2].value);
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[1].value, 'The value #1 is present');
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[2].value, 'The value #2 is present');
    assert.equal(this.get('model.field')[0], optionsObjects[1].id , 'Value #2 is set on the model');
    assert.equal(this.get('model.field')[1], optionsObjects[2].id , 'Value #0 is set on the model');
    await clickTrigger();
    await click('.ember-power-select-option:nth-child(1)'); // index + 1
    assert.equal(this.get('model.field')[2], optionsObjects[0].id , 'Value #0 is set on the model');
  });

  test('Different field names (block compoment)', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsObjects2);
    //Render template.
    await render(hbs`
      {{#c-form-field-select-simple model=model field="field" options=options selectId="key" selectValue="name" multiple=true as |item|}}
        {{item.name}}
      {{/c-form-field-select-simple}}
    `); 
    // Select one option.
    await selectChoose('.ember-power-select-trigger', optionsObjects[1].value);
    await selectChoose('.ember-power-select-trigger', optionsObjects[2].value);
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[1].value, 'The value #1 is present');
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[2].value, 'The value #2 is present');
    assert.equal(this.get('model.field')[0], optionsObjects[1].id , 'Value #2 is set on the model');
    assert.equal(this.get('model.field')[1], optionsObjects[2].id , 'Value #0 is set on the model');
    await clickTrigger();
    await click('.ember-power-select-option:nth-child(1)'); // index + 1
    assert.equal(this.get('model.field')[2], optionsObjects[0].id , 'Value #0 is set on the model');
  });

  test('Different field names (inline component)', async function(assert) {
    this.set('model', { field : null });
    this.set('options', optionsObjects2);
    //Render template.
    await render(hbs`
      {{c-form-field-select-simple model=model field="field" options=options selectId="key" selectValue="name" multiple=true}}
    `); 
    // Select one option.
    await selectChoose('.ember-power-select-trigger', optionsObjects[1].value);
    await selectChoose('.ember-power-select-trigger', optionsObjects[2].value);
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[1].value, 'The value #1 is present');
    assert.dom('.ember-power-select-trigger').includesText(optionsObjects[2].value, 'The value #2 is present');
    assert.equal(this.get('model.field')[0], optionsObjects[1].id , 'Value #2 is set on the model');
    assert.equal(this.get('model.field')[1], optionsObjects[2].id , 'Value #0 is set on the model');
    await clickTrigger();
    await click('.ember-power-select-option:nth-child(1)'); // index + 1
    assert.equal(this.get('model.field')[2], optionsObjects[0].id , 'Value #0 is set on the model');
    // await pauseTest();
  });

});

