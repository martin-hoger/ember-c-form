import Ember from 'ember';

export default Ember.Component.extend({
  classNames        : ['field'],
  classNameBindings : ['required', 'class', 'error:error:'],

  error: Ember.computed('model.validations.errors.[]', function() {
    var field = this.get("field");
    if ((Ember.isPresent(field)) && (this.get("model.validations.errors"))) {
      let errors = this.get("model.validations.errors").filterBy("attribute", field);
      if (errors.length > 0) {
        // if (this.get('model.' + this.get('field'))) {
          //Return the vary last element.
          return errors.pop().message;
        // }
      }
    }
  })
});
