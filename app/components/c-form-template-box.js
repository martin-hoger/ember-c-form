/*
  Template list for the textarea
  ==============================

  Usage in .hbs:
  {{#c-form-template-box model=this field="title"}}
       {{c-form-field-input-textarea
         model=this
         field="title"
       }}
  {{/c-form-template-box}}

*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { defineProperty } from '@ember/object';
import { convertAccentedCharacters } from 'ember-c-base-pack/helpers/convert-accented-characters';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({

  classNames: ['template-box'],
  // templates : [
  //   'aaa', 'abc', 'bbbbbb', 'cccc'
  // ],

  templates: [],

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
          return false
        } else {
          return true
        }
      })
    );

  },

  setText(newText) {
    var fieldName = this.get('field');
    this.get('model').set(fieldName, newText);
  },

  // Put selected template or append to existing text in textarea
  appendText(template) {
    var fieldName = this.get('field');
    var model = this.get('model');
    var text = model.get(fieldName);  // text already written in textarea?
    if (text) {
      this.get('model').set(fieldName, text + ' ' + template);  // append with space
    } else {
      this.get('model').set(fieldName, template);  // set
    }
  },

  loadTemplates() {
    var templates = this.get('store').peekAll('input-template');
    templates = templates.filter((template) => {
      return template.get('key') ==  this.get('key');
    });
    this.set('templates', templates);
   // this.set("templates", peakAll('input-template').filtr podle key)
  },

  // Working with keyboard:
  keyDown(event) {
    // console.log(event.keyCode);
    // console.log(event.ctrlKey);
    // Ctrl + P : open the template list and focus the input
    if (event.ctrlKey == true && event.keyCode == 80) {
      this.set('listOpen', true);
      // wait until render finished, then focus input
      scheduleOnce('afterRender', this, function() {
        this.$().find('.template-box-content input').focus().select();
      });
      return false;
    }

    // user wrote to "search" and pressed ENTER => set/append first matching template to the textarea
    if (this.get('searchTemplate') && event.keyCode == 13) {
      var fistFoundTemplate = this.get('rowsFiltered')[0];
      this.appendText(fistFoundTemplate);
      this.set('searchTemplate', '');  // clear search input
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

    // Open button clicked -> open / close the template list and clear the search input
    open() {
      this.toggleProperty('listOpen');
      this.set('searchTemplate', '');
      this.loadTemplates();
    },

    // Save button clicked
    save() {
      var templates = this.get('templates');
      var fieldName = this.get('field');
      var model = this.get('model');
      var text = model.get(fieldName);
      text = text.trim();  // Remove whitespace
      // Text not empty and not same as already saved? Then save.
      if (text && !templates.includes(text)) {
        templates.pushObject(text);
        // open the list of templates after save, if closed
        if (!this.get('listOpen')) {
          this.set('listOpen', true);
        }
      }
    },

    // Template row click -> put template to the text area or append template to actual text
    applyTemplate(template) {
      this.appendText(template);
    },

    // Delete icon clicked
    deleteTemplate(text) {
      var templates = this.get('templates');
      templates.removeObject(text);
    }

  }

});
