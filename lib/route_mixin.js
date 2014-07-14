Ember.FlashMessageRouteMixin = Ember.Mixin.create({
  flashMessage: function(message, messageType, dismissTimer) {
    var controller = this.controllerFor('flashMessage');

    var messageObject = Ember.Object.create({
      text: message
    });

    if(typeof messageType !== 'undefined') {
      messageObject.set('type', messageType);
    }

    if(typeof dismissTimer !== 'undefined') {
      messageObject.set('dismissTimer', dismissTimer);
    }

    controller.set('queuedMessage', messageObject);

    return controller;
  }
});
