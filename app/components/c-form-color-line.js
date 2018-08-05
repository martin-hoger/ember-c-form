import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

/*
  Usage in .hbs:
  {{c-form-field-select-color-from-object
    model=modelName
    field="fieldName"
    label="labelName"
    allowClear=true
    options=settings.highlightColors
  }}

*/
export default Component.extend({

  tagName  : 'div',
  classNames: ['form-color-line'],
  attributeBindings: ['style'],

  style: computed('color', function(){
    // debugger;
    var bgColor = this.get('color');
    var styleStr = `background-color: ${bgColor}`;
    // var styleStr = `background-color: ${bgColor}; display:inline-block; height:38px; width:100%`;
    return htmlSafe(styleStr); //this returns the safe html text
  }),

});
