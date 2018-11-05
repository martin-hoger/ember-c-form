/*
  Table of the property for copying to email as HTML. One property is one table.
  This is the table (and row) component.

  Usage:
  {{#c-form-field-copy-to-clipboard-html
    buttonText="Kopírovat do schránky (HTML)"
  }}
    {{#each properties as |property|}}
      {{c-property-html-email property=property language=language}}
    {{/each}}
  {{/c-form-field-copy-to-clipboard-html}}

*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  tagName   : '',

  separator: computed('property', function() {
    var str = '<span style="color: gray"> / </span>';
    return htmlSafe(str);
  }),

});
