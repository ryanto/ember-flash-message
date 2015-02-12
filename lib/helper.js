Ember.FlashMessageView = Ember.ContainerView.extend({
  hideAndShowMessage: function() {
    var currentMessage = this.get('controller.currentMessage'),
        view;

    if (currentMessage) {
      view = Ember.View.create({
        template: this.get('template')
      });
    }

    this.set('currentView', view);
  }.observes('controller.currentMessage')
});

Ember.Handlebars.registerHelper('flashMessage', function(options) {
  var template = options.fn,
      container = this._keywords.view.container,
      controller = container.lookup('controller:flashMessage');

  options.hash.controller = controller;
  options.hashTypes = options.hashTypes || {};

  Ember.Handlebars.helpers.view.helperFunction.call(this, ["flashMessage"], options.hash, options, options);
});
