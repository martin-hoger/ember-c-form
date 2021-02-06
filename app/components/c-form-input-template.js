/*
  Template list for the textarea
  ==============================
  - shows load/save buttons and other content only when mouse is over the component
  - checks, if written text is already in the templates. If so, disables "save" button
  - Ctrl + P opens templates list and focuses the search input
  ...

  Usage in .hbs:
  {{#c-form-input-template model=this field="title" key="test"}}
       {{c-form-field-input-textarea
         model=this
         field="title"
       }}
  {{/c-form-input-template}}

*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { defineProperty } from '@ember/object';
import { convertAccentedCharacters } from 'ember-c-base-pack/helpers/convert-accented-characters';
import { scheduleOnce } from '@ember/runloop';
import { inject } from '@ember/service';

export default Component.extend({

  store : inject(),

  classNames: ['input-template'],
  templates : null,
  hasFocus  : false,

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
        var includesText = '';
        if (templates) {
          includesText = templates.filterBy('text', text);
        }
        // Text not empty and not same as already saved? Then enable save.
        if (text && includesText == '') {
          return false
        } else {
          return true
        }
      })
    );

  },

  mouseEnter() {
    this.set('hasFocus', true);
  },

  mouseLeave() {
    this.set('hasFocus', false);
  },

  // Put selected template or append to existing text in textarea
  appendText(template) {
    var fieldName = this.get('field');
    var model = this.get('model');
    var text = model.get(fieldName);  // text already written in textarea?
    if (text) {
      this.get('model').set(fieldName, text + ' ' + template.get('text'));  // append with space
    } else {
      this.get('model').set(fieldName, template.get('text'));  // set
    }
  },

  // Load templates, only with the same key as here.
  loadTemplates() {
    var templates = this.get('store').peekAll('input-template');
    templates = templates.filterBy('templateKey', this.get('key'));
    this.set('templates', templates);
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
        this.$().find('.input-template-window input').focus().select();
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

  // Filtr templates when writing to search input - without special characters (ěščřő...)
  rowsFiltered: computed('templates.@each.text', 'searchTemplate', function() {
    var searchQuery = this.get('searchTemplate');
    if (searchQuery === '' || searchQuery === undefined) {
      return this.get('templates');
    }
    searchQuery        = convertAccentedCharacters([ searchQuery ]);
    searchQuery        = searchQuery.replace(' ', '.*');
    var regExPattern   = '\\b.*' + searchQuery + '.*\\b';
    var regexp         = new RegExp(regExPattern,'gi');
    return this.get('templates').filter(function(row){
      if (row.get('searchFulltext')) {
        return row.get('searchFulltext').match(regexp);
      }
    });
  }),

  actions: {

    // Open button clicked -> open / close the template list
    // if opened, load templates, clear the search input and focus it
    open() {
      this.toggleProperty('listOpen');
      if (this.get('listOpen')) {
        this.set('searchTemplate', '');
        this.loadTemplates();
        scheduleOnce('afterRender', this, function() {
          this.$().find('.input-template-window input').focus().select();
        });
      }
    },

    // Save button clicked
    save() {
      this.loadTemplates();
      var templates = this.get('templates');
      var fieldName = this.get('field');
      var model = this.get('model');
      var text = model.get(fieldName);
      text = text.trim();  // Remove whitespace
      // open the list of templates, if closed
      if (!this.get('listOpen')) {
        this.set('listOpen', true);
      }
      // Text not empty and not same as already saved? Then save.
      var includesText = '';
      if (templates) {
        includesText = templates.filterBy('text', text);
      }
      if (text && includesText == '') {
        var newTemplate = this.get('store').createRecord('input-template', {
          templateKey: this.get('key'),
          text       : text
        });
        newTemplate.save();
        this.loadTemplates();
      }
    },

    // Template row click -> put template to the text area or append template to actual text
    applyTemplate(template) {
      this.appendText(template);
      this.attrs.applyTemplate();
    },

    // Delete icon clicked -> delete after user confirmation
    deleteTemplate(template) {
      var confirmation = confirm('Are you sure?');
      if (confirmation) {
        template.deleteRecord();
        template.save();
        this.loadTemplates();
      }
    }

  }

});
