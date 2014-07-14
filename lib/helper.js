Ember.FlashMessageView = Ember.View.extend({
  autoDismiss: function() {
    var that = this;
    if (this.get('_state') === 'inDOM') {
      Ember.run(function() {
        that.$().fadeOut(250, function() {
          if (that.get('controller')) {
            that.get('controller').set('currentMessage', null);
          }
        });
      });
    }
  }
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
            view = Ember.FlashMessageView.create({
              template: template
            });
            if (Ember.get(currentMessage, 'dismissTimer')) {
              Ember.run.later(function() {
                view.autoDismiss();
              }, currentMessage.get('dismissTimer'));
            }
          }

          this.set('currentView', view);
        }.observes('controller.currentMessage')
      });

  options.hash.controller = controller;
  options.hashTypes = options.hashTypes || {};

  Ember.Handlebars.helpers.view.call(this, parent, options);
});
