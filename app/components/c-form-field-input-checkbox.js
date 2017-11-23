import Ember from 'ember';

export default Ember.Component.extend({
  classNames : ['field'],
  valueOn    : 1, 
  valueOff   : 0, 

  //If checked set proper icon.
  isChecked : Ember.computed('model', function () {
    let value = this.get('model.' + this.get('field'));
    return !(value === false || value === undefined || value === null | value === 0 || value === '0' || value === '' || value === this.get('valueOff')); 
  }),

  value: Ember.computed('isChecked', function () {
    return this.get('isChecked') ? this.get("valueOn") : this.get("valueOff");
  }),

  actions: {
    toggle: function() {
      this.set('isChecked', !this.get('isChecked'));
      this.set('model.' + this.get('field'), this.get("value"));
      // Fire external action passed to this component.
      if (this.get("onChange")) {
        this.attrs.onChange(this.get("value"));
      }
    },
  }

});



