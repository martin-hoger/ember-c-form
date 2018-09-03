import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

/**

  Usage:
  http://ember-power-select.com/docs/custom-search-action

  Component:

  export default Ember.Component.extend({
    searchTask: task(function* (searchQuery) {
      yield timeout(500);
      searchQuery        = convertAccentedCharacters([ searchQuery ]);
      searchQuery        = searchQuery.replace(' ', '.*');
      var regExPattern   = '\\b.*' + searchQuery + '.*\\b';
      var regexp         = new RegExp(regExPattern,'gi');
      return this.get('products').filter(function(row){
        return row.get('fulltext').match(regexp);
      });
    }),
  })


  Template:

  {{#c-form-field-select-external-search
    model=model
    field=field
    search=(perform searchTask)
    onSelect=onSelect
    as |product|
  }}
    {{c-image-thumbnail url=product.titleImage width=25 height=25 rounded=false}}
    {{product.title}} ({{product.model}})
  {{/c-form-field-select-external-search}}

*/
export default Ember.Component.extend(FieldMixin, {
  fieldType   : 'select',

  init() {
    this._super(...arguments);

    // Variable "selected" (passed to power select) is computed property.
    //
    // Define computed property dynamically.
    // It is not possible to define computed property with variable in it.
    //     It is not possible to make:
    //     Ember.computed('model.' + this.get('field')
    Ember.defineProperty(this, 'selected', 
      Ember.computed('model.' + this.get('field'), function() {
        var value = this.get('model.' + this.get('field'));
        return value;
      })
    );

  },

  actions: {
    // When value is selected, save it.
    search(term) {
      // Send action if it is passed.
      if (!this.get('search')) {
        console.log("c-form-field-select-external-search: search action is not defined!");
        return;
      }
      return this.get('search')(term);
    },
    // When value is selected, save it.
    selected(value) {
      this.set('model.' + this.get('field'), value);
      // Send action if it is passed.
      if (this.get('onSelect')) {
        this.get('onSelect')(value);
      }
    }
  },

});
