import Component from '@ember/component';
import { defineProperty } from '@ember/object';
import { computed } from '@ember/object';
/*
 * Attributes:
 * model         - model.
 * field         - selected field.
 * options       - all options.
 * disabled      - field is disabled.
 * selectId      - name of select id (default is id).
 * selectValue   - name of select value (default is value.
*/
import FieldMixin from './c-form-field-mixin';

export default Component.extend(FieldMixin, {
  fieldType   : 'input-select',
  selectId    : 'id',
  selectValue : 'value',

  init() {
    this._super(...arguments);
    let initValue = this.get('model.' + this.get('field'));
    if (!initValue) {
      this.set('model.' + this.get('field'), this.get('options')[0].id);
    }
    
    // Variable "selected" (passed to power select) is computed property.
    //
    // Define computed property dynamically.
    // It is not possible to define computed property with variable in it.
    //     It is not possible to make:
    //     Ember.computed('model.' + this.get('field')
    defineProperty(this, 'selected', computed('model.' + this.get('field'), 'field', function() {
        var value = this.get('model.' + this.get('field'));
        return value;
      })
    );
  },

  optionsPrepared : computed('options.[]', 'selected', function() {
    var options = [];
    var selectId    = this.get('selectId');
    var selectValue = this.get('selectValue');
    this.get('options').forEach((data) => { 
      let id = typeof data.get === 'function' ? data.get(selectId) : data[selectId];
      let value = typeof data.get === 'function' ? data.get(selectValue) : data[selectValue];
      options.pushObject({
        'id'       : id,
        'value'    : value,
        'selected' : this.get('selected') == id,
      });
    });
    return options;
  }),

  actions: {
    selectChanged(value) {
      // Set the value for the field.
      // Originally there was an action (mut (get model field)),
      // however when this was fired, no change action here in the component was called.
      this.set('model.' + this.get('field'), value);
      // Execute an action passed to the component.
      if (this.get('onSelect')) {
        this.get('onSelect')(value);
      }
      // In case there is an old way action.
      // Probably it is even not needed here but it doesn't hurt here.
      if (this.get('action')) {
        this.get('action')(value);
      }
    }
  },

});
