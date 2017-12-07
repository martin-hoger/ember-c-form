/*
  c-stars-display component
  Shows as many stars, as the number in value.
  The color of all stars is accordïng value.

  usage in .hbs:
  {{c-stars-display value=0}    => no star displayed
  {{c-stars-display value=3}    => 3 yellow stars displayed
  {{c-stars-display value=row.rating}}
  {{c-stars-display value=row.rating editable=true}}  => user can edit rating by click
  {{c-stars-display value=row.rating editable=true onSelect=(action "onSelect")}}    => action added, when user clicks
  {{c-stars-display value=row.rating editable=true onSelect=(toggle "www" row)}}     => different action

*/

import Ember from 'ember';

export default Ember.Component.extend({

  colors : {
    0 : '#FFFFFF',  // not used (no star)
    1 : '#FF0000',  // red
    2 : '#FFA500',  // orange
    3 : '#FFFF00',  // yellow
    4 : '#9ACD32',  // yellowgreen
    5 : '#008000',  // green
  },

  classNames        : ['star-rating'],
  classNameBindings : ['editable'],
  attributeBindings : ['style'],
  editable          : false,

  // Create the color of the star:
  style: Ember.computed('value', function() {

    var value  = this.get('value');
    var colors = this.get('colors');
    var starColor = colors[value];  // starColor according to the number in 'value'
    var styleStr = `color: ${starColor}`;

    return Ember.String.htmlSafe(styleStr); // this returns the safe html text
  }),

  // Create an array according to value. value = 2 => stars = [true, true, false, false, false]
  // the array is then used in template to iterate and display 5 stars,
  // star class according to value => 2 stars with style selected = visible,
  // 3 stars with class unselected = unvisible. (Class is defined in CSS style file.)
  stars: Ember.computed('value', function() {

    // length of the object = number of colors
    var length = Object.keys(this.get('colors')).length - 1;
    var stars  = [];
    var value  = this.get('value');

    for (var i = 1; i <= length; i++) {
      let selected = (i <= value);
      stars.push(selected);
    }

    return stars;
  }),

  actions: {

    // When star is selected.
    starSelected(index) {
      // If form is not editable, finish here.
      if (!this.get('editable')) {
        return false;
      }

      let currentValue = this.get('value');
      let newValue     = index + 1;
      if (newValue == currentValue) {
        newValue = 0;
      }
      this.set('value', newValue);

      // If component defines "onSelect" action,
      // call it and pass the value.
      var action = this.get('onSelect');
      if (action) {
        // Call function saved in variable action,
        // pass parameter newValue;
        action(newValue);
      }
    }
  }

});
