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
    this.sendAction();
  }

});
