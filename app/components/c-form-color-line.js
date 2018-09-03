/*
  Displays line with passed color, also possible to pass a text on the line
  
  Usage in .hbs:
 {{c-form-color-line color=yourColor text=yourText}}

*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  tagName  : 'div',
  classNames: ['form-color-line'],
  attributeBindings: ['style'],

  style: computed('color', function(){
    var bgColor = this.get('color');
    var styleStr = `background-color: ${bgColor}`;
    return htmlSafe(styleStr); //this returns the safe html text
  }),

});
