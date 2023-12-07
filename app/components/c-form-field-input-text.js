/*
    {{c-form-field-input-text}}
    required: when using label, it is a star after label text.
              If no label, it is a star in the input box.

    Inputs:
      title - title of the <input>
      inputClassName - you can pass class name to the <input>
      anonymized - true shows "*****" insted of real data. If no data, show nothing

*/

import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';
import { computed } from '@ember/object';

export default Component.extend(FieldMixin, {
  // Input type: text, password, etc...
  type              : 'text',
  fieldType         : 'input-text',
  classNameBindings : ['unit:has-unit:', 'suffixIcon:suffix-icon:'],
  anonymized        : false,

  keyUp : function() {
    this.sendAction();
  },

  anonymizedValue: computed('anonymized', function() {
    var value = this.get('model.' + this.get('field'));
    var anonymizedValue;
    if (value) {
      anonymizedValue = '***********';
    } else {
      anonymizedValue = null;
    }

    return anonymizedValue;
  }),

});
