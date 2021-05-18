//
// More info about creating the tests.
// https://basecamp.com/2251989/projects/3309995/documents/14915014
// 

import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
// import { setupMirage } from 'ember-cli-mirage/test-support';
import { render, click } from '@ember/test-helpers';
import { pauseTest } from '@ember/test-helpers';

module('Integration | Component | c-form-input-template', function(hooks) {
  setupRenderingTest(hooks);
  // setupMirage(hooks);

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
});

