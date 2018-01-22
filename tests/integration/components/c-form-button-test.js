import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-form-button', 'Integration | Component | c-form-button', {
  integration: true,
});

test('Input value', function(assert) {
  this.set('label', 'label12');

  //Render component template.
  this.render(hbs`{{c-form-button disabled="disabled" label=label}}`);

  //Test - display label
  assert.equal((this.$('div').text().search(this.get('label')) >= 0), true);

  //Test - disabled input.
  assert.equal(this.$('div').hasClass('disabled'), true);

  //Test - external action.
  this.set('externalAction', (data) => {
    assert.equal(data, 'test23');
  });
  this.render(hbs`{{c-form-button label=label action=(action externalAction "test23")}}`);
  this.$('button').click();
});

