/*
{{#c-form-field-textarea-copy-to-clipboard
  buttonText="Kopírovat do schránky"
  icon="nameOfTheIcon"
}}
*/

import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  icon       : 'copy',
  buttonText : 'Copy to clipboard',
  fieldType  : 'input-textarea',
  classNames : ['textarea-copy-to-clipboard'],

  actions: {

    copy() {
      console.log('stisknuto copy');
      var textarea = this.$().find('textarea').select();
      document.execCommand('copy');
      console.log(textarea);
    }

  },

});
