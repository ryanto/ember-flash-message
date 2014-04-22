Ember.FlashMessageControllerMixin = Ember.Mixin.create({
  needs: ['flashMessage'],
  flashMessage: function(message) {
    var controller = this.get('controllers.flashMessage');

    controller.set('queuedMessage', message);

    return controller;
  }
});

Ember.Controller.reopen(Ember.FlashMessageControllerMixin);
