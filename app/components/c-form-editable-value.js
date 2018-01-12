import Ember from 'ember';

export default Ember.Component.extend({
  classNames        : ['editable-value'],
  classNameBindings : ['align', 'editMode:edited:'],
  align             : 'left',

  editMode          : false,
  editModeRunning   : false,

  // Select the input when it is rendered.
  // Only first time - component is rerendered
  // with every key press.
  didRender() {
    this._super(...arguments);
    if (this.get('editMode') && !this.get('editModeRunning')) {
      this.set('editModeRunning', true);
      this.$().find('input').focus().select();
    }
  },

  // When the element is focused out.
  // This was also fired when the user clicked save. :(
  focusOut() {
    // Send action cancel.
    // this.send("cancel");
    // console.log("focused out");
  },

  actions: {
    // Set edit mode when clicked on the field.
    startEditMode() {
      var modelField = "model." + this.get("field");
      this.set("value", this.get(modelField));
      this.set('editMode', true);
    },
    // Save action.
    // Expects save attr on the component to pass the action:
    // {{#c-form-editable-value model=product field='price' save=(route-action 'saveProduct' product)}}
    save() {
      var modelField = "model." + this.get("field");
      this.set(modelField, this.get("value"));
      this.set('editMode', false);
      this.set('editModeRunning', false);
      if (this.get('save')) {
        this.get('save')();
      }
    },
    // Close the edit window.
    cancel() {
      this.set('editMode', false);
      this.set('editModeRunning', false);
      if (this.get('cancel')) {
        this.get('cancel')();
      }
    }
  },

});
