import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { render, click, triggerEvent } from '@ember/test-helpers';
// import { pauseTest } from '@ember/test-helpers';

// import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';
// registerPowerSelectHelpers();

module('Integration | Component | c-form-field-select-simple-html', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  const options = [
    { id: 1, value: 'Airplane' },
    { id: 2, value: 'Bus' },
    { id: 3, value: 'Rocket' },
  ];

  // const optionsArray = ['Airplane', 'Bus', 'Rocket'];

  test('Init state - field value is empty', async function(assert) {
    // Not completely persuaded that this should be the default behavior of a select.
    this.set('options', options);
    this.set('model', { field : null });
    await render(hbs`{{c-form-field-select-simple-html model=model field="field" options=options}}`);
    // Check all the options.
    this.options.forEach((option, index) => {
      assert.dom('option:nth-child(' + (index + 1) + ')').hasText(option.value);
    });
    //When empty we take
    assert.equal(this.get('model.field'), this.options[0].id, 'Set first/default value');
  });

  test('Init state - field value already set', async function(assert) {
    this.set('options', options);
    this.set('model', { field : 111 });
    await render(hbs`{{c-form-field-select-simple-html model=model field="field" options=options}}`);
    //When not empty we keep the value set.
    assert.equal(this.get('model.field'), 111, 'Do not set default/first value');

  });

  test('Select an option', async function(assert) {
    this.set('options', options);
    this.set('model', { field : null });
    await render(hbs`{{c-form-field-select-simple-html model=model field="field" options=options}}`);
    //Test - change option (choose option with id = 3).
    var index = 2;
    await triggerEvent('option:nth-child(' + (index + 1) + ')', 'change');
    assert.equal(this.get('model.field'), this.options[index].id, 'Option selected');
  });

  test('Select an option - fire action', async function(assert) {
    this.set('options', options);
    this.set('model', { field : null });
    var index = 2;
    //Test - external action.
    this.set('externalAction', (data) => {
      assert.equal(data, this.options[index].id, 'External event fired');
    });
    await render(hbs`{{c-form-field-select-simple-html model=model field="field" options=options onSelect=(action externalAction)}}`);
    await triggerEvent('option:nth-child(' + (index + 1) + ')', 'change');
  });

  test('Field value is changed - change option', async function(assert) {
    this.set('options', options);
    this.set('model', { field : this.options[1].id });
    await render(hbs`{{c-form-field-select-simple-html model=model field="field" options=options}}`);
    assert.equal(this.element.querySelector('select').value, this.options[1].id, 'Default value set');
    // Value changed, the select should follow.
    this.set('model.field', this.options[2].id,);
    assert.equal(this.element.querySelector('select').value, this.options[2].id, 'Value changed');
  });

  test('Render label', async function(assert) {
    this.set('options', options);
    this.set('model', { field : this.options[1].id });
    this.set('labelText', 'Test label');
    await render(hbs`{{c-form-field-select-simple-html label=labelText model=model field="field" options=options}}`);
    assert.dom('label').hasText(this.get('labelText'), 'Label present');
  });

  test('Show error message', async function(assert) {
    var errorMessage = 'Error message';
    this.set('options', options);
    this.set('model', { 
      field : this.options[1].id, 
      validations: { errors : [ { 'attribute' : 'field', 'message' : errorMessage}]}
    });
    await render(hbs`{{c-form-field-select-simple-html label=labelText model=model field="field" options=options}}`);
    assert.dom('.error-message').hasText(errorMessage, 'Error message present');
  });

});


