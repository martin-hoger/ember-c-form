/*
  Table of the property for copying to email as HTML. One property is one table.
  This is the table (and row) component.
  Property picture and title includes a HTML link of property.

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

  // Generate property link like: https://www.luxusni-bydleni-praha.com/node/17294
  link: computed('property', function() {
    var domainUrl = window.location.protocol + '//' + window.location.host;
    var link = domainUrl + '/node/' + this.get('property.id');
    return htmlSafe(link);
  }),

});
