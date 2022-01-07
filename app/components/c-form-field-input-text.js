/*
    {{c-form-field-input-text}}
    required: when using label, it is a star after label text.
              If no label, it is a star in the input box. 
*/

import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  // Input type: text, password, etc...
  type              : 'text',
  fieldType         : 'input-text',
  classNameBindings : ['unit:has-unit:', 'suffixIcon:suffix-icon:'],

  keyUp : function() {
    this.sendAction();
  },

});
