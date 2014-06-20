Ember.FlashMessageRouteMixin = Ember.Mixin.create({
  flashMessage: function(message, messageType) {
    var controller = this.controllerFor('flashMessage');

    var messageObject = Ember.Object.create({
      text: message
    });

    if(typeof messageType !== 'undefined') {
      messageObject.set('type', messageType);
    }

    controller.set('queuedMessage', messageObject);

    return controller;
  }
});
