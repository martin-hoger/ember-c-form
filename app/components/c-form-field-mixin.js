import Ember from 'ember';

export default Ember.Mixin.create({
  classNamesDefault        : ['field'],
  classNameBindingsDefault : ['fieldTypeName', 'required', 'error:error:'],
  
  // Custom error message.
  errorMessage : null,

  init() {
    this._super(...arguments);
    // Merge classNameBindings from the component with the default params defined here.
    var classNamesDefault = this.get('classNamesDefault');
    var classNameBindingsDefault = this.get('classNameBindingsDefault');
    this.set('classNames', this.get('classNames').concat(classNamesDefault));
    this.set('classNameBindings', this.get('classNameBindings').concat(classNameBindingsDefault));
  },

  // Generates the full field type name for the tag class attribute.
  fieldTypeName : Ember.computed('fieldType', function () {
    return 'field-' + this.get('fieldType');
  }),

  // Check validators to generate error message.
  error: Ember.computed('model.validations.errors.[]', function() {
    var field = this.get('field');
    if ((Ember.isPresent(field)) && (this.get('model.validations.errors'))) {
      let errors = this.get('model.validations.errors').filterBy('attribute', field);
      if (errors.length > 0) {
          return errors.pop().message;
      }
    }
  })
});
