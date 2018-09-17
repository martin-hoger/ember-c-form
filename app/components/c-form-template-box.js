/*

  Usage in .hbs:


*/

import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // tagName  : 'div', // div it is default
  classNames: ['template-box'],
  templates : [
    'aaaaaaa', 'bbbbbb', 'cccc'
  ],

  saveDisabled: computed('model.field', function() {
  // saveDisabled: computed('model[fieldName]', function() {
  // saveDisabled: computed(this.get('model'), function() {
  console.log('spusten saveDeisable');
    var fieldName = this.get('field');
    var model = this.get('model');
    var text = model[fieldName];
    if (text) {
      console.log('saveDisabled==false');
      return false
    } else {
      console.log('saveDisabled==true');
      return false
      // return true
    }
  }),

  actions: {

    save() {
      var templates = this.get('templates');
      var fieldName = this.get('field');
      var model = this.get('model');
      var text = model[fieldName];
      if (text) {
        console.log('save ', text);
        templates.pushObject(text);
      }
    },

    loadTemplate(text) {
      var fieldName = this.get('field');
      console.log('load ', text);
      this.get('model').set(fieldName, text);
    },

    deleteTemplate(text) {
      console.log('delete ', text);
      var templates = this.get('templates');
      templates.removeObject(text);
    }

  }

});
