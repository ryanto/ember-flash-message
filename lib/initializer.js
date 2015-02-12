Ember.Application.initializer({
  name: 'flashMessage',
  initialize: function(container, application) {
    container.register('controller:flashMessage', Ember.FlashMessageController);
    container.register('view:flashMessage', Ember.FlashMessageView);
  }
});
