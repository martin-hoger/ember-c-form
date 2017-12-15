import Ember from 'ember';
import { getNames } from 'ember-i18n-iso-countries';

/*
  Usage in .hbs:
  {{c-form-field-select-country
      model=nameOfYourModel
      field="nameOfCountryFiledInTheModel"
      label="label to be displayed above"
  }}

*/
export default Ember.Component.extend({

  tagName  : '',
  countries: getNames('en'),

});
