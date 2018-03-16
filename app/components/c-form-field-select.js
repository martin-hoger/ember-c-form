import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

/**
Usage:

  {{c-form-field-select 
      label="Cenová skupina"
      model=row
      field="priceCategory"
      options=(array "M" "P-A" "P-B" "P-C" "P-D")
  }}

  {{#c-form-field-select 
      label="Autor"
      model=article
      field="user"
      options=users as |user|
  }}
    {{user.name}}
  {{/c-form-field-select}}
 
 */
export default Ember.Component.extend(FieldMixin, {
  fieldType   : 'select',
  searchField : null,
  multiple    : false,

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
        return this.convertSelected(value);
      })
    );

  },

  // Some data needs to be converted.
  inputOptions: Ember.computed('options.[]', function () {
    return this.convertInput(this.get('options'));
  }),

  // If search key is passed, enable search.
  searchEnabled: Ember.computed('searchField', function () {
    return this.get('searchField') ? true : false;
  }),

  actions: {
    // When value is selected, save it.
    selected(value) {
      value = this.convertOutput(value);
      this.set('model.' + this.get('field'), value);
      // Send action if it is passed.
      if (this.get('onSelect')) {
        this.get('onSelect')(value);
      }
    }
  },

  /* -------------------------------------------- */

  /**
   * Convert input values.
   *
   */
  convertInput(options) {

    // If it is plain object, we need to create an array:
    //    { "key1" : "value1", "key2" : "value2", ... }
    // Final:
    //    [{ "id" : "key1", "value" : "value1" }, { ... }, ...]
    if (Ember.typeOf(options) === 'object') {
      // If there is not searchField, set to "value".
      if (this.get('searchField') === null) {
        this.set('searchField', 'value');
      }
      var tmpOptions = options;
      options = [];
      for (var key in tmpOptions) {
        options.push({'id': key, 'value': tmpOptions[key]});
      } 
    } 

    return options;
  },

  /**
   * Convert output value.
   *
   */
  convertOutput(value) {
    var options = this.get('options');

    // If it is plain object, we need to just use the key.
    if (Ember.typeOf(options) === 'object') {
      value = value.id;
    }

    return value;
  },

  /**
   * Convert selected value.
   * When we use plain object, it is converted,
   * if we want powerselect to select the value,
   * we need to pass the converted object to it.
   *
   */
  convertSelected(value) {
    var options = this.get('options');

    // If it is plain object.
    if (Ember.typeOf(options) === 'object') {
      value = this.get("inputOptions").findBy("id", value);
    }

    return value;
  }

});
