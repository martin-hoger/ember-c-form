import Component from '@ember/component';
import FieldMixin from './c-form-field-mixin';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend(FieldMixin, {
  classNames       : 'form-tag-input',
  store            : inject(),
  intl             : inject(),
  dialog           : inject(),
  allowedTagCreate : true,
  allowedTagRemove : true,

  init() {
    this._super(...arguments);

    //Default placeholder.
    if (!this.get('placeholder')) {
      this.set('placeholder', '');
    }

    //Default no matches message.
    if (!this.get('noMatchesMessage')) {
      this.set('noMatchesMessage', this.get('intl').t('form.pressEnterToCreateTag'));
    }

    //Load defined tags.
    var tags = this.get('store').peekAll('tag');
    this.set('tagItems', []);
    tags.forEach((tag) => {
      if (tag.get('modelName') === this.get('modelName')) {
        this.get('tagItems').pushObject(tag.get('name'));
      }
    });

    //Load defined tags for actual object.
    var tagObjects = this.get('store').peekAll('tag-object');
    this.set('selected', []);

    tagObjects.filterBy('modelName', this.get('modelName')).filterBy('modelId', Number(this.get('modelId'))).forEach((tagObject) => {
      this.get('selected').pushObject(tagObject.get('tag.name'));
    });
  },

  actions: {
    //Create new tag.
    createTag(select, e) {
      //Create is allowed, enter key is pressed.
      if ((this.get('allowedTagCreate')) && (e.keyCode === 13)) {
        if (select.isOpen && !select.highlighted && ((select.searchText) !== '')) {
          if (!this.selected.includes(select.searchText)) {
            this.tagItems.pushObject(select.searchText);
            //Add tag to array tags.
            select.actions.choose(select.searchText);
            //Create record - tag.
            this.store.createRecord('tag', {
              'practiceId' : this.get('session.user.practice.id'),
              'modelName'  : this.get('modelName'),
              'name'       : select.searchText,
              'practice'   : this.get('session.user.practice'),
            }).save().then(() => {
              //Create tag object.
              this.createTagObjects(this.get('selected'));
            });
          }
        }
      }
    },

    //Delete tag.
    deleteTag(tagName) {
      var tags       = this.get('store').peekAll('tag').filterBy('modelName', this.get('modelName'));
      var tagObjects = this.get('store').peekAll('tag-object').filterBy('modelName', this.get('modelName')).filterBy('modelId', Number(this.get('modelId')));
      var tag        = tags.filterBy('name', tagName)[0];

      if (tag) {
        this.get('dialog').confirm({
          title : this.get('intl').t('form.deleteTag', { tag : tag.get('name')})
        }).then(() => {
          this.tagItems.removeObject(tagName);
          this.selected.removeObject(tagName);

          tag.destroyRecord().then((record) => {
            this.get('store').unloadRecord(record);
          });

          var tagObject = tagObjects.filterBy('tagId', tag.get('tagId'))[0];
          if (tagObject) {
            tagObject.destroyRecord().then((record) => {
              this.get('store').unloadRecord(record);
            });
          }
        });
      }
    },
    
    //Update tag objects.
    updateTagObject(selected) {
      if (this.get('selected.length') < selected.length) {
        this.createTagObjects(selected);
      } else {
        this.deleteTagObjects(selected);
      }
      this.set('selected', selected);
    },

    stopPropagation(e) {
      e.stopPropagation();
    },
  },

  //Create new tag object.
  createTagObjects : function(tagNames) {
    var tags       = this.get('store').peekAll('tag').filterBy('modelName', this.get('modelName'));
    var tagObjects = this.get('store').peekAll('tag-object').filterBy('modelName', this.get('modelName')).filterBy('modelId', Number(this.get('modelId')));

    if (tagNames.length) {
      tagNames.forEach((tagName) => {
        var tag = tags.filterBy('name', tagName)[0];
        if (tag) {
          var tagObject = tagObjects.filterBy('tagId', tag.get('tagId'))[0];
          if (!tagObject) {
            //Create tag object.
            this.store.createRecord('tag-object', {
              'id'        : this.get('modelName') + '-' + Number(this.get('modelId')) + '-' + tag.get('tagId'), 
              'modelName' : this.get('modelName'),
              'modelId'   : Number(this.get('modelId')),
              'tagId'     : tag.get('tagId'),
              'practice'  : this.get('session.user.practice'),
            }).save();
          }
        }
      });
    }
  },
  
  //Delete tag object.
  deleteTagObjects : function(tagNames) {
    var tagObjects = this.get('store').peekAll('tag-object').filterBy('modelName', this.get('modelName')).filterBy('modelId', Number(this.get('modelId')));
    tagObjects.forEach((tagObject) => {
      if (tagObject.get('tag')) {
        if (!tagNames.includes(tagObject.get('tag.name'))) {
          tagObject.destroyRecord().then((record) => {
            this.get('store').unloadRecord(record);
          });
        }
      }
    });
  }
  
});

