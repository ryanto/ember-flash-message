Ember.Route.reopen(
  Ember.FlashMessageRouteMixin, {
  activate: function() {
    this._super.apply(this, arguments);
    var controller = this.controllerFor('flashMessage');

    controller.setProperties({
      queuedMessage: null,
      currentMessage: controller.get('queuedMessage')
    });
  }
});
