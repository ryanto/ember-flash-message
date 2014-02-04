Ember.FlashMessageController = Ember.Controller.extend({
  queuedMessage: null,
  currentMessage: null,

  message: Ember.computed.alias('currentMessage'),

  now: function() {
    this.setProperties({
      queuedMessage: null,
      currentMessage: this.get('queuedMessage')
    });
  }
});
