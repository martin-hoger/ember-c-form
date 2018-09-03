import FieldMixin from './c-form-field-mixin';
import Component from '@ember/component';
import { defineProperty } from '@ember/object';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';

export default Component.extend(FieldMixin, {
  idFieldName : 'id',

  modifiedOptions: computed('model.${field}', 'options.[]', function () {
    var options = [];
    //Some data needs to be converted.
    this.prepareOptions(this.get('options')).forEach((option) => {
      if (this.get('model.' + this.get('field'))) {
        //If item is already in array => set as selected.
        this.get('model.' + this.get('field')).forEach((modelOption) => {
          if (option.id === modelOption) {
            option.selected = 'selected';
          }
        });
      }
      options.pushObject(option);
    });
    return options;
  }),

  actions: {
    selectOption(option) {
      //If output array is not defined.
      if (!this.get('model.' + this.get('field'))) {
        this.set('model.' + this.get('field'), []);
      }

      //Check if item is already exist in array.
      var isElementSetOn = false;
      this.get('model.' + this.get('field')).forEach((modelOption) => {
        if (modelOption === option.id) {
          isElementSetOn = true;
        }
      });

      //Toggle value of selected item.
      if (isElementSetOn) {
        this.get('model.' + this.get('field')).removeObject(option.id);
      } else {
        this.get('model.' + this.get('field')).pushObject(option.id);
      }

      this.sendAction();
    }
  },

  /**
   * Prepare options - convert to array.
   *
   */
  prepareOptions(options) {

    // Prepare array of items.
    // Final output:
    //    [{ "id" : "id1", "data" : object1 }, { "id" : "id2", "data" : object2 }]
    var preparedOptions = [];
    options.forEach((option) => {
      //Option is simple value.
      if ((typeOf(option) === 'string') || (typeOf(option) === 'number')) {
        preparedOptions.pushObject({ id : option });
      }
      //Option is object.
      if (typeOf(option) === 'object') {
        preparedOptions.pushObject({
          id   : option[this.get('idFieldName')],
          data : option
        })
      }
      //Option is Ember instance.
      if (typeOf(option) === 'instance') {
        preparedOptions.pushObject({
          id   : option.get(this.get('idFieldName')),
          data : option
        })
      }
    });

    return preparedOptions;
  },

});
