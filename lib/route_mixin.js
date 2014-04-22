Ember.FlashMessageRouteMixin = Ember.Mixin.create({
  flashMessage: function(message) {
    var controller = this.controllerFor('flashMessage');

    controller.set('queuedMessage', message);

    return controller;
  }
});

Ember.Route.reopen(Ember.FlashMessageRouteMixin);
