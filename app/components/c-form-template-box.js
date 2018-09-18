/*

  Usage in .hbs:


*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { defineProperty } from '@ember/object';
import { convertAccentedCharacters } from 'ember-c-base-pack/helpers/convert-accented-characters';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({

  classNames: ['template-box'],
  // findInput : false,
  templates : [
    'aaa', 'abc', 'bbbbbb', 'cccc'
  ],

  // After list content showed (Ctrl + T), select input (only once)
  // didRender() {
  //   this._super(...arguments);
  //   if (this.get('findInput')) {
  //     this.$().find('.template-box-content input').focus().select();
  //     this.set('findInput', false);
  //   }
  // },

  init() {
    this._super(...arguments);

    // Define computed property dynamically.
    // It is not possible to define computed property with variable in it.
    // Disable save button, when text area is empty.
    defineProperty(this, 'saveDisabled',
    computed('model.' + this.get('field'), 'templates.[]', function(){
        var templates = this.get('templates');
        var fieldName = this.get('field');
        var model = this.get('model');
        var text = model.get(fieldName);
        // Text not empty and not same as already saved? Then enable save.
        if (text && !templates.includes(text)) {
          console.log('saveDisabled==false');
          return false
        } else {
          console.log('saveDisabled==true');
          return true
        }
      })
    );

  },

  // Ctrl + P : open the template list
  keyDown(event) {
    console.log(event.keyCode);
    console.log(event.ctrlKey);
    console.log('searchTemplate', this.get('searchTemplate'));
    // console.log('model', this.get('model'));
    if (event.ctrlKey == true && event.keyCode == 80) {
      console.log('spuštěno Ctrl+P, focus!');
      this.set('findInput', true);

      // debugger;
      // this.toggleProperty('listOpen');
      this.set('listOpen', true);
      // run look afterRender(() => { jQuery stuff })
      scheduleOnce('afterRender', this, function() {
        this.$().find('.template-box-content input').focus().select();
      });
      return false;
    }
    // user wrote and pressed ENTER => put first matching template to the textarea
    if (this.get('searchTemplate') && event.keyCode == 13) {
      // debugger;
      var fistFoundTemplate = this.get('rowsFiltered')[0];
      var fieldName = this.get('field');
      this.get('model').set(fieldName, fistFoundTemplate);
    }

  },

  // Filtr templates:
  rowsFiltered: computed('searchTemplate', function() {
    var searchQuery = this.get('searchTemplate');
    if (searchQuery === '' || searchQuery === undefined) {
      return this.get('templates');
    }
    searchQuery        = convertAccentedCharacters([ searchQuery ]);
    searchQuery        = searchQuery.replace(' ', '.*');
    var regExPattern   = '\\b.*' + searchQuery + '.*\\b';
    var regexp         = new RegExp(regExPattern,'gi');
    return this.get('templates').filter(function(row){
      return row.match(regexp);
    });
  }),

  actions: {
    // Save button clicked
    save() {
      var templates = this.get('templates');
      var fieldName = this.get('field');
      var model = this.get('model');
      var text = model.get(fieldName);
      // Text not empty and not same as already saved? Then save.
      if (text && !templates.includes(text)) {
        console.log('save ', text);
        templates.pushObject(text);
        // open the list of templates after save, if closed
        if (!this.get('listOpen')) {
          this.set('listOpen', true);
        }
      }
    },

    // Template row click -> put template to the text area or add template to actual text
    applyTemplate(template, event) {
      var fieldName = this.get('field');
      var model = this.get('model');
      // var text = model[fieldName];
      var text = model.get(fieldName);
      if (event.ctrlKey == true) {
        // Ctlr button pressed => add template to actual text
        console.log('CTRL, přidat k textu', text + template);
        this.get('model').set(fieldName, text + template);
      } else {
        // without Ctrl => put template to the textarea
        this.get('model').set(fieldName, template);
      }
    },

    deleteTemplate(text) {
      var templates = this.get('templates');
      templates.removeObject(text);
    }

  }

});
