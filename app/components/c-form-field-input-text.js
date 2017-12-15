import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  // Input type: text, password, etc...
  type              : 'text',
  filedType         : 'input-text',
  classNameBindings : ['unit:has-unit:', 'suffixIcon:suffix-icon:'],

  keyUp : function() {
    this.sendAction();
  }
});
