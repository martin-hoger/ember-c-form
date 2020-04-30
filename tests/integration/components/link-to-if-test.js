import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers';

import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';

registerPowerSelectHelpers();

moduleForComponent('link-to-if', 'Integration | Component | link-to-if', {
  integration: true,
});


test('Integration: link-to-if', function(assert) {

  /* ########### Input options is array. ########### */

  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },
    field : 'Bus',
  });

  //Render template.
  // this.render(hbs`{{c-form-field-select label="Some label" model=model field="field" options=(array "Airplane" "Car" "Rocket") description='Travel'}}`);
  // this.render(hbs`{{link-to-if label="Some label" model=model field="field" options=(array "Airplane" "Car" "Rocket") description='Travel'}}`);
  this.render(hbs`
    {{#link-to-if condition=true show=true params=(array "kuk")}}
     visible
    {{/link-to-if}}
  `);

  //1.Test - it shows passed text
  assert.equal((this.$().text().search('visible') >= 0 ), true);

  //2.Test - it has a link
  // assert.equal((this.$('a').attr('href') == '/v2/a/practices' ), true);
  assert.equal((this.$().text().search('kuk') >= 0), true);
  assert.equal((this.$('a').attr('href') == 'kuk' ), true);

  this.render(hbs`
    {{#link-to-if condition=true show=true params=(array "application.admin.stats.stat" "videos") class="my-special" replace=true }}
      this text will be visible and link active<br/>
    {{/link-to-if}}
  `);

  //3.Test - it has link /v2/a/stats/videos
  assert.equal((this.$('a').attr('href') == '/v2/a/stats/videos' ), true);

  //4.Test - it has class
  assert.equal((this.$('a').hasClass('my-special') == true ), true);

  this.render(hbs`
    {{#link-to-if condition=false show=false params=(array "application.admin.practices")}}
     notvisible
    {{/link-to-if}}
  `);

  //Test - it doesn't shows passed text
  assert.equal((this.$().text().search('notvisible') == -1 ), true);

  this.render(hbs`
    {{#link-to-if condition=false show=true params=(array "application.admin.practices")}}
     condition=false show=true => visible
    {{/link-to-if}}
  `);

  //Test - it shows passed text
  assert.equal((this.$().text().search('condition=false show=true => visible') >= 0 ), true);

});

test('Integration: link-to-if, does not show text', function(assert) {

  /* ########### Input options is array. ########### */

  //Set model.
  this.set('model', {
    constructor : {
      modelName : 'model'
    },
    field : 'Bus',
  });

  this.render(hbs`
    {{#link-to-if condition=false show=false params=(array "application.admin.practices")}}
     notvisible
    {{/link-to-if}}
  `);

  //Test - it doesn't shows passed text
  assert.equal((this.$().text().search('notvisible') == -1 ), true);

});

  // //Test - Default pre-set value.
  // assert.equal((this.$('div').find('.ember-power-select-selected-item').text().search('Bus') >=0 ), true);
  //
  // //Test - view options.
  // clickTrigger();
  // assert.equal((parent.$('ul.ember-power-select-options').find('li:first-child').text().search('Airplane') >= 0), true);
  // assert.equal((parent.$('ul.ember-power-select-options').find('li:last-child').text().search('Rocket') >= 0), true);
  //
  // //Set new option.
  // selectChoose('', 'Car');
  // //Test - selected new option.
  // assert.equal((this.$('div').find('.ember-power-select-selected-item').text().search('Car') >=0 ), true);
  //
  // //Test - selected new option => model is changed.
  // assert.equal((this.get('model.field').search('Car') >= 0 ), true);
  //
  //
  // /* ########### Input options is object. ########### */
  //
  // //Set model.
  // this.set('model', {
  //   constructor : {
  //     modelName : 'model'
  //   },
  //   field : { id : 2, value : 'Train'}
  // });
  //
  // //Set options.
  // this.set('options',
  //   [{ id: 1, value: 'Ship' },
  //    { id: 2, value: 'Train' },
  //    { id: 3, value: 'Truck' },
  //    { id: 4, value: 'Bike' }]
  // );
  // //Render template.
  // this.render(hbs`{{#c-form-field-select label="Some label" model=model field="field" description='Travel' options=options as |option|}}{{option.value}}{{/c-form-field-select}}`);
  //
  // //Test - Default pre-set value.
  // assert.equal((this.$('div').find('.ember-power-select-selected-item').text().search('Train') >=0), true);
  //
  // //Test - view options.
  // clickTrigger();
  // assert.equal((parent.$('ul.ember-power-select-options').find('li:first-child').text().search('Ship') >= 0), true);
  // assert.equal((parent.$('ul.ember-power-select-options').find('li:last-child').text().search('Bike') >= 0), true);
  //
  // //Set new option.
  // selectChoose('', 'Truck');
  // //Test - selected new option.
  // assert.equal((this.$('div').find('.ember-power-select-selected-item').text().search('Truck') >=0 ), true);

// });
