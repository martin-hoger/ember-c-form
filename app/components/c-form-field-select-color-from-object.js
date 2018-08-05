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

  tagName   : '',

});
