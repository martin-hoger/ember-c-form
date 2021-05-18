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
  value     : '',

  options : {
    theme : 'snow',
    modules : {
      toolbar : [
        // [{header  : [2, 3, 4, false]}],
        ['bold', 'italic', 'underline','strike'],
        [{'color' : []}],
        [{'list'  : 'ordered'}, {'list': 'bullet'}],
        [{'indent': '-1'}, { 'indent': '+1'}],
        // [{'align' : []}],
      ]
    }
  },

  init() {
    this._super(...arguments);                                              
    if (this.get('model') && this.get('field')) {
      this.set('text', this.get('model.' + this.get('field')));
    }
    if (this.get('value')) {
      this.set('text', this.get('value'));
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);
    if (this.get('value')) {
      var content = this.element.querySelector(".ql-editor");
      if (content.innerHTML != this.get('value')) {
        content.innerHTML = this.get('value');
      }
    }
  },

  actions: {
    updateText(editor) {
      var value = editor.root.innerHTML;

      //Delete empty tags = no content in form.
      if (value === '<p><br></p>') {
        value = '';
      }

      if (this.get('model') && this.get('field')) {
        this.set('model.' + this.get('field'), value);
      }
      this.set('value', value);
      this.sendAction();
    }
  },

});
