import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  filedType  : 'input-textarea',

  keyPress: function() {
    this.sendAction();
  },
});
