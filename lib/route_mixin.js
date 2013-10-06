Ember.FlashMessageRouteMixin = Ember.Mixin.create({
  flashMessage: function(message) {
    this.controllerFor('flashMessage').set('queuedMessage', message);
  }
});
