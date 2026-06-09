import Ember from 'ember';
import moment from 'moment';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  i18n        : null,
  fieldType   : 'input-datetime',
  defaultTime : '00:00',

  didReceiveAttrs() {
    this._super(...arguments);
    this.updateTime();
  },

  // Called when the time input changes (keyboard or native picker click).
  // Guard prevents re-entry when updateTime sets time from the model.
  timeObserver: Ember.observer('time', function() {
    if (!this._updatingFromModel && this.get('model.' + this.get('field'))) {
      this.setDatetime();
    }
  }),

  updateTime() {
    this._updatingFromModel = true;
    //Display setting of time.
    if (this.get('model.' + this.get('field'))) {
      var time = moment(this.get('model.' + this.get('field'))).format('HH:mm');
      if (time == '00:00') {
        //Default time
        time = this.get('defaultTime');
      }
      this.set('time', time);
    } else {
      this.set('time', null);
    }
    this._updatingFromModel = false;
  },

  actions: {
    //Selection from time input. 
    setTime: function() {
      this.setDatetime();
    }
  },
  
  //Set datetime
  setDatetime: function() { 
    var date    = this.get('model.' + this.get('field'));
    var timeStr = this.get('time') || this.get('defaultTime');
    var hours   = moment(timeStr, 'HH:mm').hours();
    var minutes = moment(timeStr, 'HH:mm').minutes();
    var value   = moment(date).startOf('day').add(hours, 'hours').add(minutes, 'minutes').toDate();
    this.set('model.' + this.get('field'), value);
    // !! NOTE !!
    // Calling sendAction is deprecated, should be replace by closure action (see onChange).
    this.sendAction();
    // Send action if it is passed.
    if (this.get('onChange')) {
      this.get('onChange')(value);
    }
  },

});
