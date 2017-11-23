import Ember from 'ember';

export default Ember.Component.extend({
  classNames : ['form-field-popup-wrapper'], 

  actions: {
    //Display popup window.
    displayWindow: function() {
      Ember.$('#popup-window-' + this.get('field') + '-' + this.get('model.id')).transition('scale');
    },
  }
});
