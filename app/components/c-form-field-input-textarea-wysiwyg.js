/*
  Template Usage:

  {{c-form-field-input-textarea-wysiwyg
      label=name
      model=contentValue
      field="value"
      action=(action "update")
  }}
*/
import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';


export default Component.extend(FieldMixin, {
  fieldType : 'input-textarea-wysiwyg',

  options : {
    theme : 'snow',
    modules : {
      toolbar : [
        [{header  : [2, 3, 4, false]}],
        ['bold', 'italic', 'underline'],
        [{'color' : []}],
        [{'list'  : 'ordered'}, {'list': 'bullet'}],
      ]
    }
  },

  actions: {
    updateText(editor) {
      var value = editor.root.innerHTML;

      //Delete empty tags = no content in form.
      if (value === '<p><br></p>') {
        value = '';
      }

      this.set('model.' + this.get('field'), value);
      this.sendAction();
    }
  },

});
