import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  init() {
    this._super(...arguments);
    this.set('name', Ember.guidFor(this));
  },

  actions: {
    changeValue: function(option) {
      this.set('model.' + this.get('field'), option.id);
    }
  }

});



