import FieldMixin from './c-form-field-mixin';
import Component from '@ember/component';
import { defineProperty } from '@ember/object';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';

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

  {{#c-form-field-select 
      label="Autor"
      model=article
      field="user"
      searchField="name"
      options=users as |user|
  }}
    {{user.name}}
  {{/c-form-field-select}}
 
 */
export default Component.extend(FieldMixin, {
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
    defineProperty(this, 'selected', 
      computed('model.' + this.get('field'), function() {
        var value = this.get('model.' + this.get('field'));
        return this.convertSelected(value);
      })
    );

  },

  // Some data needs to be converted.
  inputOptions: computed('options.[]', function () {
    return this.convertInput(this.get('options'));
  }),

  // If search key is passed, enable search.
  searchEnabled: computed('searchField', function () {
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
    if (typeOf(options) === 'object') {
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
    // If the values is null, return it.
    if (value === null) {
      return value;
    }
    // If it is plain object, we need to just use the key.
    if (typeOf(options) === 'object') {
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
    if (typeOf(options) === 'object') {
      value = this.get('inputOptions').findBy('id', value);
    }

    return value;
  }

});
