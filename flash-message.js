Ember.FlashMessageController = Ember.Controller.extend({
  queuedMessage: null,
  currentMessage: null,

  message: Ember.computed.alias('currentMessage')
});
Ember.Handlebars.registerHelper('flashMessage', function(options) {
  var template = options.fn,
      container = options.data.keywords.controller.container,
      controller = container.lookup('controller:flashMessage'),

      parent = Ember.ContainerView.extend({
        hideAndShowMessage: function() {
          var currentMessage = this.get('controller.currentMessage'),
              view;

          if (currentMessage) {
            view = Ember.View.create({
              template: template
            });
          }

          this.set('currentView', view);
        }.observes('controller.currentMessage')
      });

  options.hash.controller = controller;

  Ember.Handlebars.helpers.view.call(this, parent, options);
});
Ember.Application.initializer({
  name: 'flashMessage',
  initialize: function(container, application) {
    container.register('controller:flashMessage', Ember.FlashMessageController);
  }
});
Ember.FlashMessageRouteMixin = Ember.Mixin.create({
  flashMessage: function(message) {
    this.controllerFor('flashMessage').set('queuedMessage', message);
  }
});
Ember.Route.reopen(
  Ember.FlashMessageRouteMixin, {
  activate: function() {
    this._super.apply(this, arguments);

    var controller = this.controllerFor('flashMessage'),
        routeName = this.get('routeName');

    // do not display message in loading route, wait until
    // any loading is done.
    if (routeName !== "loading") {
      controller.setProperties({
        queuedMessage: null,
        currentMessage: controller.get('queuedMessage')
      });
    }
  }
});
