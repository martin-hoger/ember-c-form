import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  buttonYes : 0, 
  buttonNo  : 0, 

  init() {
    this._super(...arguments);

    let value = this.get('model.' + this.get('field'));
    //Set yes-buton and no-button by model value.
    if ((value === 0) || (value === '0')) {
      this.set('buttonNo', 1);
    }
    if ((value === 1) || (value === '1')) {
      this.set('buttonYes', 1);
    }
  },

  actions: {
    changeValue(type) {
      //If yes-button is checked and no-button is going to be checked.
      if ((this.get('buttonYes') === 1) && (this.get('buttonNo') === 0) && (type === 'No')) {
        this.set('buttonYes', 0);
      }
      //If no-button is checked and yes-button is going to be checked.
      if ((this.get('buttonNo') === 1) && (this.get('buttonYes') === 0) && (type === 'Yes')) {
        this.set('buttonNo', 0);
      }

      //Toggle value.
      this.set('button' + type, 1 - this.get('button' + type));

      //Set model.
      if (this.get('buttonYes') === 1) {
        this.set('model.' + this.get('field'), 1);
      } 
      if (this.get('buttonNo') === 1) {
        this.set('model.' + this.get('field'), 0);
      } 
      if ((this.get('buttonYes') === 0) && (this.get('buttonNo') === 0)) {
        this.set('model.' + this.get('field'), '');
      } 

      //Send info about action up.
      this.sendAction();
    },
  }

});



