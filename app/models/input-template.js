import DS from 'ember-data';

export default DS.Model.extend({
  templateKey       : DS.attr('string'),
  text              : DS.attr('string'),

})
