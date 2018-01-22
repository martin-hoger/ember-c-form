import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

moduleForComponent('c-form-field-input-date', 'Integration | Component | c-form-field-input-date', {
  integration: true,
});

test('Input value', function(assert) {
  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },  
    field : '2016-03-25'
  });

  //Render template.
  this.render(hbs`{{c-form-field-input-date model=model field="field"}}`);

  //Test - input value.
  assert.equal(this.$('input').val(), '25.03.2016');

  //Changing date in pika day.
  let interactor = openDatepicker(this.$('input'));
  let expectedDate = new Date('2012-07-29');
  interactor.selectDate(expectedDate);
  //Test - pika day input value.
  assert.equal(this.$('input').val(), '29.07.2012');

  //Test - changed model date value.
  let date = String(this.get('model.field'));
  assert.equal(date.substr(0,15), 'Sun Jul 29 2012');

});



