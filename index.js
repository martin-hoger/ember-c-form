/*jshint node:true*/
module.exports = {
  name: 'ember-c-form',

  isDevelopingAddon: function() {
    return true;
  },

  includeTestsInHosts: true,

  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    return this._super.included.apply(this, arguments);
  }
};
