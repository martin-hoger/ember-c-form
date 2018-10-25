import Ember from 'ember';
import moment from 'moment';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  icon       : 'copy',
  buttonText : 'Copy to clipboard',
  classNames: ['textarea-copy-to-clipboard'],


  actions: {

    copy() {
      console.log('stisknuto copy');
      var textarea = this.$().find('textarea').select();
      document.execCommand('copy');
      console.log(textarea);
    }

  },

});
