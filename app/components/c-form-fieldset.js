import Ember from 'ember';

export default Ember.Component.extend({
  classNames  : "form-fieldset",
  fixExpanded : false,

  init() {
    this._super(...arguments);
    if (this.get('fixExpanded')) {
      this.set('expanded', true);
    }
    if (this.get('fixCollapsed')) {
      
      this.set('expanded', false);
    }
  },

  click: function() {
    this.sendAction();
  },

  actions: {
    changeExpanding: function() {
      //If fieldset change expand is allowed.
      if ((!this.get('fixExpanded')) && (!this.get('fixCollapsed'))) {
        if (this.get('expanded')) {
          this.set('expanded', false);
        } else {
          this.set('expanded', true);
        }
      }
    }
  }
});



