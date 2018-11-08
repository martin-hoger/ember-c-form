import DS from 'ember-data';
import { computed } from '@ember/object';
import { convertAccentedCharacters } from 'ember-c-base-pack/helpers/convert-accented-characters';

export default DS.Model.extend({
  templateKey       : DS.attr('string'),
  text              : DS.attr('string'),

  // for searching without special characters (ěščřő...)
  searchFulltext : computed('text', function () {
    return convertAccentedCharacters([ this.get('text') ]);
  }),

})
