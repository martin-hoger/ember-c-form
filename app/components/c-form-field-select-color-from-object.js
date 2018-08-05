import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
// import { getNames } from 'ember-i18n-iso-countries';

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

  tagName  : '',
  // countries: getNames('en'),

  // myStyle: computed('type', function(){
  //   // debugger;
  //   var bgColor = this.get('type.value');
  //   var styleStr = `background-color: ${bgColor}; display: block`;
  //   return htmlSafe(styleStr); //this returns the safe html text
  //
  // }),


});
