/*
  Component with 'YES' and 'NO' icons. To set 'value' to specified value or leave it
  unset. Use it, if you need to know, if the value was set.
  Not set - buttons gray, no other field. After clicking YES, the {{yield}} is showen
  to input the value.
  - Its also possible to pass valueYes and valueNo.
  - Title text.

  model.field value is:
  null : value not yet set. {{yield}} field not yet showen.
  ''   : value set, but not yet to the right value. {{yield}} field showen
  -1   : value set to 'NO' (e.g. there is NO garden!)
  something else : set to specified value

  Usage with input-text in yield
  {{#c-form-field-input-conditional
    model=this
    field="inputText"
    label="c-form-field-input-conditional"
    title="Your title text will be showen"
  }}
    {{c-form-field-input-text
      model=this
      field="inputText"
    }}
  {{/c-form-field-input-conditional}}

  Usage, when we want only set YES and NO values:
  {{c-form-field-input-conditional
    model=row
    field="initialCellar"
    label="Sklep"
    valueYes=1
    valueNo=0
  }}

  CSS:
  Dont't show error message for the yield content (we don't want two error messages)
*/

import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';
import { computed, defineProperty } from '@ember/object';

export default Component.extend(FieldMixin, {
  fieldType         : 'input-conditional',
  attributeBindings : ['title'],
  title             : null,  // default: no title, but its possible to pass it
  valueYes          : '',  // If passed, will be used to set after YES button clicked
  valueNo           : -1,  // If passed, will be used to set after NO button clicked

  init() {
    this._super(...arguments);
    // value: define computed property dynamically.
    // We need to know the value of this.get('model').get(this.get('field'))
    defineProperty(this, 'value',
      computed('model', 'field', 'model.' + this.get('field'), function () {
        var model = this.get('model');
        var field = this.get('field');
        if (!model || !field) {
          return;
        }
        return model.get(field);
      })
    );
  },

  // YES button clicked or value already set.
  // value is: '', '12' or other value:
  checkedYes: computed('value', function() {
    return this.get('value') == this.get('valueYes') || (this.get('value') !== null && this.get('value') !== undefined && !this.get('checkedNo')) ;
    // old version till 14.4.2023. There was a problem: it showed checkedYes when value == undefined:
    // return this.get('value') == this.get('valueYes') || (this.get('value') !== null && !this.get('checkedNo')) ;
  }),

  // NO button clicked:
  checkedNo: computed('value', function() {
    return this.get('value') == this.get('valueNo');
  }),

  actions: {

    // Clicked YES or NO button:
    buttonClick (param) {
      // If value already set, don't overwite it with ''. Finish!
      if (this.get('checkedYes') && param === this.get('valueYes')) {
        return;
      }
      var modelField = 'model.' + this.get('field');
      this.set(modelField, param);  // Set model.field to '' or -1
    }

  }

});
