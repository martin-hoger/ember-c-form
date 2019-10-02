import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';
import { defineProperty } from '@ember/object';
import { computed } from '@ember/object';

/*
Usage: (onChange - fire external action)
  {{c-form-field-input-checkbox
    model=this
    field=selected
    onChange=(action "select")
  }}
*/
export default Component.extend(FieldMixin, {
  classNameBindings : ['inline:inline-checkbox'],
  fieldType         : 'input-checkbox',
  valueOn           : 1,
  valueOff          : 0,

  init() {
    this._super(...arguments);

    // Define computed property dynamically.
    // It is not possible to define computed property with variable in it.
    //     It is not possible to make:
    //     Ember.computed('model.' + this.get('field')
    defineProperty(this, 'isChecked', computed('model.' + this.get('field'), 'field', function() {
        var value = this.get('model.' + this.get('field'));
        return !(value === false || value === undefined || value === null | value === 0 || value === '0' || value === '' || value === this.get('valueOff')); 
      })
    );
  },

  actions: {
    toggle: function() {
      var isChecked = this.get('isChecked');
      var newValue  = isChecked ? this.get('valueOff') : this.get('valueOn');
      this.set('model.' + this.get('field'), newValue);
      // Fire external action passed to this component.
      if (this.get('onChange')) {
        this.get('onChange')(newValue);
      }
    },
  }

});
