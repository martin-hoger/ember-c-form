import Ember from 'ember';
import moment from 'moment';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  i18n        : null,
  taskTimeout : '1000',
  tagName     : '',
    
  init() {
    this._super(...arguments);
    //Display setting of time.
    this.set('time', moment(this.get('model.' + this.get('field'))).format('HH:mm'));
  },

  actions: {
    //Selection from time input. 
    setTime: function() {
      this.get('timeRequest').perform();
    }
  },
  
  //Time request (Ember concurrency).
  timeRequest: task(function * () {
    //Timeout.
    yield timeout(this.get('taskTimeout'));
    //Set datetime.
    this.setDatetime();
  }).restartable(),
  
  //Set datetime
  setDatetime: function() {
    var date    = this.get('model.' + this.get('field'));
    var hours   = moment(this.get('time'), "HH:mm").hours();
    var minutes = moment(this.get('time'), "HH:mm").minutes();
    this.set('model.' + this.get('field'), moment(date).startOf('day').add(hours, 'hours').add(minutes, 'minutes')._d);
    //Update model.
    if (this.get('save')) {
      this.model.save();
    }
  },

});


