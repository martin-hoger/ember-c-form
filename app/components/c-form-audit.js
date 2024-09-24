import Component from '@ember/component';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store : inject(),

  init() {
    this._super(...arguments);
  },

  // Load model data from the backend.
  loadRows: task(function * () {
    yield this.store.query('object-audit', {
      'name': this.model.constructor.modelName, 
      'id': this.model.id,
      'field': this.field
    }).then((rows) => {
      this.set('auditRows', rows);
    });

  }).on('didReceiveAttrs'),

  // Load model data from the backend.
  loadRowsAll: task(function * () {
    yield this.store.query('object-audit', {
      'name': this.model.constructor.modelName, 
      'id': this.model.id,
      'uid': this.get('selectedUser.id')
    }).then((rows) => {
      this.set('auditRowsAll', rows);
    });

  }),

  actions: {
    onSelect(user) {
      // We open the other records only if we are currently on the field table
      // Otherwise it will not do anything, for ins. for the client profile.
      if (this.field) {
        this.set('selectedUser', user);
        this.get('loadRowsAll').perform()
      }
    },
  }

});
