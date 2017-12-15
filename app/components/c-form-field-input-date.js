import Ember from 'ember';
import moment from 'moment';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  i18n       : null,
  session    : Ember.inject.service('session'),
  filedType  : 'input-date',

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
      this.sendAction();
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


