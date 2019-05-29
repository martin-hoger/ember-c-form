import Ember from 'ember';
import FieldMixin from './c-form-field-mixin';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend(FieldMixin, {
  fieldType                  : 'input-textarea',
  displayNotificationTimeout : 1500,

  keyPress: function() {
    this.sendAction();
    if (this.get('saveNotificationTimeout')) {
      this.get('notification').perform();
    }
  },
  
  //Display notification.
  notification: task(function * () {
    yield timeout(this.get('saveNotificationTimeout'));
    this.$('.display-notification').transition('scale', '500ms');
    yield timeout(this.get('displayNotificationTimeout'));
    this.$('.display-notification').transition('scale', '500ms');
  }).restartable(),
});
