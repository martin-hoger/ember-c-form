import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-form-field-select-simple', 'Integration | Component | c-form-field-select-simple', {
  integration: true,
});

test('Input value', function(assert) {
  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },  
    field : 2
  });

  this.set('options',
      [{ id: 1, value: 'test1' },
       { id: 2, value: 'test2' },
       { id: 3, value: 'test3' }]
  );

  //Render template.
  this.render(hbs`{{c-form-field-select-simple model=model field="field" options=options}}`);

  //Test - set first option.
  assert.equal((this.$('option:eq(0)').text().search(this.options[0].id) >= 0), true );
  //Test - set second option.
  assert.equal((this.$('option:eq(1)').text().search(this.options[1].id) >= 0), true );

  //Test - default selected option (id = 2).
  assert.equal(this.get('model.field'), this.options[1].id);

  //Test - change option (choose option with id = 3).
  this.$('option:eq(2)').change();
  assert.equal(this.get('model.field'), this.options[2].id);

  //Test - external action.
  this.set('externalAction', (data) => {
    assert.equal(data, 'test23');
  });
  this.render(hbs`{{c-form-field-select-simple model=model field="field" options=options action=(action externalAction "test23")}}`);
  this.$('option:eq(1)').change();
});

