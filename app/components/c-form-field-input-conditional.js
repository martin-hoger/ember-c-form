import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';
import { computed } from '@ember/object';
import { defineProperty } from '@ember/object';

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
        return model.get(field);
      })
    );
    defineProperty(this, 'checkedYes',
      computed('model', 'field', 'model.' + this.get('field'), function () {
        var model = this.get('model');
        var field = this.get('field');
        return model.get(field) === '';
      })
    );
    defineProperty(this, 'checkedNo',
      computed('model', 'field', 'model.' + this.get('field'), function () {
        var model = this.get('model');
        var field = this.get('field');
        return model.get(field) === -1;
      })
    );
  },

  // // (not-eq value "")
  // checkedYes: computed('value', function() {
  //   console.log('val', this.get('value'));
  //   return this.get('value') === '';
  // }),
  //
  // // {{#if (not-eq value -1)}}
  // checkedNo: computed('value', function() {
  //   console.log('val', this.get('value'));
  //   return this.get('value') === -1;
  // }),

  isExpanded: computed('value', function() {
    // {{#if (or checkedYes ((get model field)}}
    var modelField = this.get('model.' + this.get('field'));
    console.log('modelField', modelField);
    return (this.get('value') !== -1);
  }),


  actions: {

    buttonClick (param) {
      console.log(param);
      // this.set('value', param);
      var modelString = 'model.' + this.get('field');
      console.log('modelString', modelString);
      // this.set('modelString', param);
      this.set('row.initialGarden', param);

    }

  }


});
