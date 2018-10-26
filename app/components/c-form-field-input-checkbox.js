/*
Usage: (onChange - fire external action)
  {{c-form-field-input-checkbox
    model=this
    field=selected
    onChange=(action "select")
  }}
*/

import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  fieldType  : 'input-checkbox',
  valueOn    : 1,
  valueOff   : 0,

  //If checked set proper icon.
  isChecked : Ember.computed('model', function () {
    let value = this.get('model.' + this.get('field'));
    return !(value === false || value === undefined || value === null | value === 0 || value === '0' || value === '' || value === this.get('valueOff'));
  }),

  value: Ember.computed('isChecked', function () {
    return this.get('isChecked') ? this.get('valueOn') : this.get('valueOff');
  }),

  actions: {
    toggle: function() {
      this.set('isChecked', !this.get('isChecked'));
      this.set('model.' + this.get('field'), this.get('value'));
      // Fire external action passed to this component.
      if (this.get('onChange')) {
        this.get('onChange')(this.get('value'));
      }
    },
  }

});
