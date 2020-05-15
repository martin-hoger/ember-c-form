import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';
import { defineProperty } from '@ember/object';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

/*
  Selects and returns single ID or an array of IDs (if multiple = true).
  It accepts all the parameters as c-form-field-select.

  Basic usage:
  {{c-form-field-select-simple
      model=mode
      field="fieldName"
      options=options
  }}

  Default options array:
  [
    { id: 1, value: 'Value #0' },
    { id: 2, value: 'Value #1' },
    { id: 3, value: 'Value #2' },
  ];

  It is possible to pass which item will be used to get ID and value,
  by setting selectId="key" selectValue="name", in case of an array like this:
  [
    { key: 1, name: 'Value #0' },
    { key: 2, name: 'Value #1' },
    { key: 3, name: 'Value #2' },
  ];

  Example:
  {{#c-form-field-select-simple model=model field="field" options=options selectId="key" selectValue="name" multiple=true as |item|}}
      {{item.name}}
  {{/c-form-field-select-simple}}


*/
export default Component.extend(FieldMixin, {
  tagName       : '',
  searchField   : null,
  multiple      : false,
  closeOnSelect : true,

  // It is possible to pass which item will be used to get ID and value.
  selectId    : 'id',
  selectValue : 'value',

  init() {
    this._super(...arguments);
    // Variable "selected" is passed directly to power select,
    // overwrites the selected computed property in c-form-field-select.
    //
    // Define computed property dynamically.
    // It is not possible to define computed property with variable in it.
    //     It is not possible to make:
    //     Ember.computed('model.' + this.get('field')
    var modelField = 'model.' + this.get('field');
    defineProperty(this, 'selected', computed(modelField, modelField + '.[]', 'field', 'options.[]', function() {
        var value    = this.get('model.' + this.get('field'));
        var selectId = this.get('selectId');
        var multiple = this.get('multiple')
        var selected = multiple? [] : null;
        this.get('options').forEach((option) => { 
          // If not multiple values.
          if (!multiple && option[selectId] == value) {
            selected = option;
          } 
          // Multiple values at once.
          if (multiple && isArray(value) && value.includes(option[selectId])) {
              selected.pushObject(option);
          }
        });
        return selected;
      })
    );
  },

  actions: {
    // When value is selected, save it.
    onSelect(result) {
      var multiple   = this.get('multiple')
      var value      = multiple ? [] : null;
      var selectId = this.get('selectId');
      // If not multiple.
      if (!multiple && result) {
          value = result[selectId];
      }
      // If multiple.
      if (multiple && isArray(result)) {
        result.forEach(function (item) {
            value.push(item[selectId]);
        });
      }
      this.set('model.' + this.get('field'), value);
      // Send action if it is passed.
      if (this.get('onSelect')) {
        this.get('onSelect')(value);
      }
    }
  },

});
