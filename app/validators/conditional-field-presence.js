/*
  Validator for {{c-form-field-input-conditional}}
  Validate, if value is filled.

  If value is '', it means button Yes was clicked. Now user must fill the value,
  the value can't be empty string.

  Usage in /app/models/validations/project.js:
  initialTerrace: [
    validator('conditionalFieldPresence')
  ],
*/

import BaseValidator from 'ember-cp-validations/validators/base';

const Validator = BaseValidator.extend({

validate(value/*, options, model*/) {
    if (value !== '') {
      return true;
    }

    return 'Vyplňte prosím';
  }

});

export default Validator;
