/*
    {{c-form-field-input-text-num}}

    Numeric input with live thousands-separator formatting.
    Stores a Number in the model; displays it formatted (e.g. 1 000 000).

    Inputs:
      title              - title of the <input>
      inputClassName     - extra class name passed to the <input>
      thousandsSeparator - separator string (default: non-breaking space '\u00A0')
      decimalSeparator   - decimal separator (default: ',')

    Usage:
        {{c-form-field-input-text-num model=model field="price" label="Částka" unit="Kč"}}

*/

import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';
import { computed } from '@ember/object';

export default Component.extend(FieldMixin, {
  fieldType         : 'input-text-num',
  classNameBindings : ['unit:has-unit:', 'suffixIcon:suffix-icon:'],

  thousandsSeparator : '\u00A0', // non-breaking space
  decimalSeparator   : ',',

  // Cached refs.
  _numberInputEl      : null,
  _numberInputHandler : null,
  _observedField      : null,
  _modelObserver      : null,

  keyUp : function() {
    this.sendAction();
  },

  // For consistency with c-form-field-input-text (unused here, but harmless).
  anonymizedValue: computed('anonymized', function() {
    return null;
  }),

  didInsertElement() {
    this._super(...arguments);
    var inputEl = this.element.querySelector('input.c-number-format');
    if (!inputEl) {
      return;
    }
    this.set('_numberInputEl', inputEl);

    // Render the initial formatted value from the model.
    var initial = this._formatNumber(this.get('model.' + this.get('field')));
    inputEl.value = (initial === null || initial === undefined) ? '' : initial;

    // Live formatting on every input event (keystroke, paste, autofill).
    var component = this;
    var handler = function() {
      component._handleNumberInput(inputEl);
    };
    this.set('_numberInputHandler', handler);
    inputEl.addEventListener('input', handler);

    // Observe external model changes; refresh input only if user isn't typing.
    var field = this.get('field');
    if (field) {
      this._observedField = field;
      var modelObserver = function() {
        if (document.activeElement === inputEl) {
          return;
        }
        var formatted = component._formatNumber(component.get('model.' + field));
        inputEl.value = (formatted === null || formatted === undefined) ? '' : formatted;
      };
      this._modelObserver = modelObserver;
      this.addObserver('model.' + field, modelObserver);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    var inputEl = this.get('_numberInputEl');
    var handler = this.get('_numberInputHandler');
    if (inputEl && handler) {
      inputEl.removeEventListener('input', handler);
    }
    if (this._observedField && this._modelObserver) {
      this.removeObserver('model.' + this._observedField, this._modelObserver);
    }
  },

  // Format a numeric model value into the displayed string with thousands separator.
  _formatNumber(value) {
    if (value === null || value === undefined || value === '') {
      return value;
    }
    var thousandsSeparator = this.get('thousandsSeparator');
    var decimalSeparator = this.get('decimalSeparator');
    var stringValue = String(value).replace('.', decimalSeparator);
    var parts = stringValue.split(decimalSeparator);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    return parts.join(decimalSeparator);
  },

  // Parse a user-typed string: number, null (cleared), or undefined (intermediate state).
  _parseNumber(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    var thousandsSeparator = this.get('thousandsSeparator');
    var decimalSeparator = this.get('decimalSeparator');
    var raw = String(value)
      .split(thousandsSeparator).join('')
      .split(' ').join('')
      .split(decimalSeparator).join('.');
    if (raw === '' || raw === '-' || raw === '.') {
      return undefined;
    }
    var parsed = parseFloat(raw);
    if (isNaN(parsed)) {
      return undefined;
    }
    return parsed;
  },

  _countDigits(str, position) {
    var count = 0;
    for (var i = 0; i < position && i < str.length; i++) {
      var ch = str.charAt(i);
      if (ch >= '0' && ch <= '9') {
        count++;
      }
    }
    return count;
  },

  _findPositionAfterDigits(str, digitCount) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
      if (count >= digitCount) {
        return i;
      }
      var ch = str.charAt(i);
      if (ch >= '0' && ch <= '9') {
        count++;
      }
    }
    return str.length;
  },

  // Called on every `input` event: parse, update model, reformat input, restore caret.
  _handleNumberInput(inputEl) {
    var rawValue = inputEl.value;
    var caretPosition = inputEl.selectionStart;
    var digitsBeforeCaret = this._countDigits(rawValue, caretPosition);

    var parsed = this._parseNumber(rawValue);
    var field = this.get('field');

    if (parsed !== undefined) {
      // Update model (null clears the value).
      this.set('model.' + field, parsed);
    }

    // Always reformat what the user sees.
    var formatted;
    if (parsed === null || parsed === undefined) {
      // Keep user-typed intermediate state ("-", "12,").
      formatted = rawValue;
    } else {
      formatted = this._formatNumber(parsed);
    }
    if (formatted === null || formatted === undefined) {
      formatted = '';
    }

    if (inputEl.value !== formatted) {
      inputEl.value = formatted;
      var newCaret = this._findPositionAfterDigits(formatted, digitsBeforeCaret);
      try {
        inputEl.setSelectionRange(newCaret, newCaret);
      } catch (e) {
        // ignore
      }
    }

    this.sendAction();
  },

});
