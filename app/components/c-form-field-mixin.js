import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  classNamesDefault        : ['field'],
  classNameBindingsDefault : ['fieldTypeName', 'required', 'error:error:'],
  
  // Custom error message.
  errorMessage : null,

  init() {
    this._super(...arguments);
    // If not tag-less component...
    if (this.get('tagName')) {
      // Merge classNameBindings from the component with the default params defined here.
      var classNamesDefault = this.get('classNamesDefault');
      var classNameBindingsDefault = this.get('classNameBindingsDefault');
      this.set('classNames', this.get('classNames').concat(classNamesDefault));
      this.set('classNameBindings', this.get('classNameBindings').concat(classNameBindingsDefault));
    }
  },

  // Generates the full field type name for the tag class attribute.
  fieldTypeName : computed('fieldType', function () {
    return 'field-' + this.get('fieldType');
  }),

  // Check validators to generate error message.
  error: computed('model.validations.errors.[]', 'field', function() {
    var field = this.get('field');
    if (isPresent(field) && this.get('model.validations.errors')) {
      let errors = this.get('model.validations.errors').filterBy('attribute', field);
      if (errors.length > 0) {
          return errors.pop().message;
      }
    }
  })
});
