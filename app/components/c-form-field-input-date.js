import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  i18n     : null,
  session  : Ember.inject.service('session'),
  tagName  : '',

  //Observer of user language.
  language : Ember.observer('session.user.language', function() {
    this.changeLanguage();
  }),

  init() {
    this._super(...arguments);
    this.changeLanguage();
  },

  actions: {
    //Selection from date input. 
    setDate: function(date) {
      this.set('model.' + this.get('field'), date);
    }
  },

  //Change local language.
  changeLanguage: function() {
    //Set moment locale.
    moment.locale(this.get('session.user.language'));
    //Set localization translation.
    var i18n = Ember.Object.create({
      months: moment.localeData()._months,
      weekdays: moment.localeData()._weekdays,
      weekdaysShort: moment.localeData()._weekdaysShort
    });
    this.set("i18n", i18n);
  },

});


