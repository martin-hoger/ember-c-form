import Ember from 'ember';

export default Ember.Component.extend({
  classNames        : ['ui', 'button', 'form-button'],
  classNameBindings : ['disabled', 'icon:labeled:', 'icon:icon:', 'loading', 'loading:disabled:'],

  icon: null,
  loading: false,

  click: function() {
    this.sendAction();
  }

});
