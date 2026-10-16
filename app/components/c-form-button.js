/*
  Usage with the botton title attribute, color class:
  {{c-form-button
    title="Your title text"
    class=blue
  }}
*/

import Component from '@ember/component';

export default Component.extend({
  classNames        : ['ui', 'button', 'form-button'],
  classNameBindings : ['disabled', 'icon:labeled:', 'icon:icon:', 'loading', 'loading:disabled:'],
  attributeBindings : ['title'],

  icon    : null,
  loading : false,
  title   : null,

  click: function() {
    if (this.get('disabled') || this.get('loading')) {
      return;
    }
    var action = this.get('action');
    if (typeof action === 'function') {
      action();
      return;
    }
    // Legacy string action (deprecated), use closure action: action=(action "name").
    if (action) {
      this.sendAction(); // eslint-disable-line ember/closure-actions
    }
  }

});
