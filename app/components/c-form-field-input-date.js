/*
  format    - possible to define format of the date.
  Usage: set month and year instead of date, month, year.
  {{c-form-field-input-date
    model=session.statsBrokerCommentRatings
    field="datepickerDateFrom"
    placeholder="Datum od"
    class="two wide"
    allowClear=true
    format="MM.YYYY"
    onChange=(route-action "dateChanged")
  }}
*/

import Ember from 'ember';
import moment from 'moment';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  i18n       : null,
  session    : Ember.inject.service('session'),
  fieldType  : 'input-date',
  useUTC     : true,

  //Observer of user language.
  language : Ember.observer('session.user.language', function() {
    this.changeLanguage();
  }),

  init() {
    this._super(...arguments);
    this.changeLanguage();

    this.set('pikadayInput', 'pikaday-input');
    if (this.get('inputless')) {
      this.set('pikadayInput', 'pikaday-inputless');
    }

  },

  didRender() {
    this._super(...arguments);
    //Not allowed autocomplete options.
    var elementPikaday = document.querySelector('#' + this.get('elementId') + ' input');
    elementPikaday.autocomplete = "off";
  },

  actions: {
    //Selection from date input.
    setDate: function(value) {
      this.set('model.' + this.get('field'), value);

      // !! NOTE !!
      // Calling sendAction is deprecated, should be replace by closure action (see onChange).
      this.sendAction();

      // Send action if it is passed.
      if (this.get('onChange')) {
        this.get('onChange')(value);
      }
    }
  },

  //Change local language.
  changeLanguage: function() {
    //Set moment locale.
    moment.locale(this.get('session.user.language'));
    //Set localization translation.
    var i18n = Ember.Object.create({
      months        : moment.localeData()._months,
      weekdays      : moment.localeData()._weekdays,
      weekdaysShort : moment.localeData()._weekdaysShort
    });
    this.set("i18n", i18n);
  },

});
