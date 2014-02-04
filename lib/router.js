Ember.Route.reopen(
  Ember.FlashMessageRouteMixin, {
  activate: function() {
    this._super.apply(this, arguments);

    var controller = this.controllerFor('flashMessage'),
        routeName = this.get('routeName');

    // do not display message in loading route, wait until
    // any loading is done.
    if (routeName !== "loading") {
      controller.now();
    }
  }
});
