/*
  Selecting the country as a combobox
  in our form (c-form-field) nice component

  usage in .hbs:
  {{c-form-field-select-country
        model=nameOfYourModel
        field="nameOfCountryFiledInTheModel"
        label="label you want to display above the combobox"
  }}
*/

import Ember from 'ember';
// import names of countries from component:
import { getNames } from 'ember-i18n-iso-countries';

export default Ember.Component.extend({

  tagName  : '',
  // get country names, default country is CZ:
  countries: getNames('en'),
  selected : 'CZ',

  options: Ember.computed('countries', function() {
    return Object.keys(this.get('countries'));
  }),

  actions: {
    selected(value) {
      this.set('model.country', value);
    },
  }
});
