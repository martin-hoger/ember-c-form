import Ember from 'ember';

export default Ember.Component.extend({
  tagName     : '',
  searchField : null,

  init() {
    this._super(...arguments);

    // Define computed property dynamically.
    // It is not possible to define computed property with variable in it.
    //     It is not possible to make:
    //     Ember.computed('model.' + this.get("field")
    Ember.defineProperty(this, 'selected', 
      Ember.computed('model.' + this.get("field"), function(){
        return this.get("model." + this.get("field"));
      })
    );

  },

  // If search key is passed, enable search.
  searchEnabled: Ember.computed("searchField", function () {
    return this.get("searchField") ? true : false;
  }),

  actions: {
    selected(value) {
      this.set("model." + this.get("field"), value);
      // Send action if it is passed.
      if (this.get("onSelect")) {
        this.attrs.onSelect(value);
      }
    }
  }

});
