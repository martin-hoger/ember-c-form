/*
  Table of the property for copying to email as HTML. One property is one table.
  This is the yield component with copy-to-clipboard button.

  Usage:
  {{#c-form-field-copy-to-clipboard-html
    buttonText="Kopírovat do schránky (HTML)"
    icon="nameOfTheIcon"
  }}
    {{#each properties as |property|}}
      {{c-property-html-email property=property language=language}}
    {{/each}}
  {{/c-form-field-copy-to-clipboard-html}}
*/

import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';

export default Component.extend(FieldMixin, {
  icon       : 'copy',                     // predefined icon
  buttonText : 'Copy to clipboard /HTML)', // predefined text, if no buttonText passed
  fieldType  : 'input-clipboard-html',
  classNames : ['copy-to-clipboard-html'],

  copyToClip(str) {
    function listener(e) {
      e.clipboardData.setData('text/html', str);
      e.clipboardData.setData('text/plain', str);
      e.preventDefault();
    }
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  },

  actions: {
    // when copy-to-clipboard-html button clicked
    // -> copy all html with table and pictures, styles... for pasting to email
    copy() {
      // console.log(this.outerHTML);
      // console.log(this.$());
      // console.log(this.$().outerHTML);
      // debugger;
      // this.copyToClip(this.$().outerHTML);
// !!! neumím odečíst button a to pak vložit do schránky. remove() odstraní z didDestroyElement
// proto dáno ID a copy z něj
      this.copyToClip(document.getElementById('copy-to-clipboard-html-tables').innerHTML);
      // this.copyToClip(document.getElementById('copy-to-clipboard-html-tables').outerHTML);
      // this.copyToClip(document.getElementById('copy-to-clipboard-htmle').outerHTML);
    }
  },

});
