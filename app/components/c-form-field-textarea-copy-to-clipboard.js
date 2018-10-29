/*
Creates a text area and copy-to-clipboard button

Usage:
  {{c-form-field-textarea-copy-to-clipboard
    buttonText="Kopírovat do chránky"
    icon="nameOfTheIcon"
    model=this
    field=stringVariableToShowAndCopyInTextarea
    class="your-special-class"
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
      var textarea = this.$().find('textarea').select();
      document.execCommand('copy');
    }

  },

});
