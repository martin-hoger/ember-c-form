/*
 * Attributes:
 * model         - model.
 * field         - selected field.
 * options       - all options.
 * disabled      - field is disabled.
 * selectId      - name of select id (default is id).
 * selectValue   - name of select value (default is value.
*/
import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  filedType  : 'input-select',

  options : Ember.computed('model.${field}', function() {
    //If select options is another like ID and VALUE.
    if (this.get('selectId') || this.get('selectName')) {
      if (!this.get('selectId')) {
        //Default values for select ID.
        this.set('selectId', 'id');
      }
      if (!this.get('selectValue')) {
        //Default values for select VALUE.
        this.set('selectValue', 'value');
      }

      var options = [];
      this.options.forEach((data) => { 
        options.pushObject({
          'id'    : data.get(this.get('selectId')),
          'value' : data.get(this.get('selectValue'))
        });
      });
      return options;
    }
  }),

  actions: {
    selectChanged(value) {
      // Set the value for the field.
      // Originally there was an action (mut (get model field)),
      // however when this was fired, no change action here in the component was called.
      this.set("model." + this.get("field"), value);
      // Execute an action passed to the component.
      this.sendAction();
    }
  },

});
