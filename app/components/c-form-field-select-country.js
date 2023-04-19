import Ember from 'ember';
import { getNames } from 'ember-i18n-iso-countries';

/*
  Usage in .hbs:
  {{c-form-field-select-country
      model=nameOfYourModel
      field="nameOfCountryFiledInTheModel"
      label="label to be displayed above"
  }}

  Use when enable searching in countries: searchField="value"
  {{c-form-field-select-country
    model=client
    field="country"
    label="Občanství"
    placeholder="Země"
    searchField="value"
  }}

*/
export default Ember.Component.extend({

  tagName  : '',
  countries: getNames('en'),

});
