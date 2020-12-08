import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';
import { computed, defineProperty } from '@ember/object';
// import { defineProperty } from '@ember/object';

export default Component.extend(FieldMixin, {
  // Input type: text, password, etc...
  type              : 'text',
  fieldType         : 'input-conditional',
  classNameBindings : ['unit:has-unit:', 'suffixIcon:suffix-icon:'],
  // value             : null,

  init() {
    this._super(...arguments);
    // fileId: define computed property dynamically.
    // We need to know the value of this.get('model').get(this.get('field'))
    defineProperty(this, 'value',
      computed('model', 'field', 'model.' + this.get('field'), function () {
        var model = this.get('model');
        var field = this.get('field');
        console.log('value comp', model.get(field));
        return model.get(field);
      })
    );
  },

  // // (not-eq value "")
  checkedYes: computed('value', function() {
    console.log('val', this.get('value'));
    // a tady ještě zjistit, zda checkedNo nebo má value hodnotu jinou, než null a -1. any(function(object){
    // Kdyý má totiž valkue == 200, tak musí být zakliknuto checkedYes! Ale když value je null, tak
    // nezaškrtnuto nic
    return this.get('value') === '' || (this.get('value') !== null && !this.get('checkedNo')) ;
  }),

  // {{#if (not-eq value -1)}}
  checkedNo: computed('value', function() {
    console.log('val', this.get('value'));
    return this.get('value') === -1;
  }),

  // isExpanded: computed('value', function() {
  //   return this.get('checkedYes');
  //   // return (!this.get('checkedNo') || this.get('value') === null) && (this.get('checkedYes') || this.get('value')) ;
  // }),


  actions: {

    buttonClick (param) {
      // If value already set, don't overwite it with ''. Finish!
      if (this.get('checkedYes') && param === '') {
        return;
      }
      var modelField = 'model.' + this.get('field');
      console.log(param);
      console.log('modelField', modelField);
      // Set model.field to '' or -1
      this.set(modelField, param);
    }

  }


});
