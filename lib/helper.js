Ember.Handlebars.registerHelper('flashMessage', function(options) {
  var container = options.data.view.container,
      controller = container.lookup('controller:flashMessage'),

      parent = Ember.ContainerView.extend({
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

  options.hash.controller = controller;
  options.hashTypes = options.hashTypes || {};

  Ember.Handlebars.helpers.view.helperFunction.call(this, [parent], options.hash, options, options);
});
