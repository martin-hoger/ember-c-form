import Ember from 'ember';

export default Ember.Component.extend({
  click: function() {
    this.sendAction();
  },
  actions: {
    changeExpanding: function() {
      if (this.get('expanded') == true) {
        this.set('expanded', false);
      } else {
        this.set('expanded', true);
      }
    }
  }
});



