Ember.Handlebars.registerHelper('flashMessage', function(options) {
  var template = options.fn,
      container = options.data.keywords.controller.container,
      controller = container.lookup('controller:flashMessage'),

      parent = Ember.ContainerView.extend({
        hideAndShowMessage: function() {
          var currentMessage = this.get('controller.currentMessage'),
              view;

          if (currentMessage) {
            if (currentMessage.get && currentMessage.get('templateName')) {
              var customTemplateName = currentMessage.get('templateName'),
                  customTemplateController = currentMessage.get('controller');

              view = Ember.View.create({
                templateName: customTemplateName,
                controller: customTemplateController,
              });
            }
            else {
              view = Ember.View.create({
                template: template
              });
            }
          }

          this.set('currentView', view);
        }.observes('controller.currentMessage')
      });

  options.hash.controller = controller;
  options.hashTypes = options.hashTypes || {};

  Ember.Handlebars.helpers.view.call(this, parent, options);
});
