import Ember from 'ember';

export default Ember.Component.extend({
  classNames        : ['ui', 'input', 'field'],
  classNameBindings : ['expanded:action:'],

  text     : "Přidat",
  icon     : "plus",
  color    : "orange",

  expanded : false,

  didRender: function () {
    // If the field is expanded and input was not focused, focus it.
    if (this.get("expanded") && !this.get("alreadySelected")) {
      this.$().find("input").focus();
      this.set("alreadySelected", true);
    }
  },

  actions : {

    enter() {
      this.actions.submit();
    },

    submit() {
      // If not expanded, expand first.
      if (!this.get("expanded")) {
        this.set("expanded", true);
        return;
      }
      // If there is action defined, pass the value.
      if (this.attrs && this.attrs.onSubmit) {
        this.attrs.onSubmit(this.get("value"));
        this.set("value", "");
        this.set("expanded", false);
      }
    }

  }

});
