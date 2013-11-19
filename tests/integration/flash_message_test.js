var App = Ember.Application.create({
  rootElement: '#qunit-fixture'
});

App.Router.map(function() {
  this.route('page1');
  this.route('page2');
  this.route('promise');
});

App.PromiseRoute = Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.run.later(function() {
        resolve();
      }, 100);
    });
  }
});

App.LoadingRoute = Ember.Route.extend();

Ember.TEMPLATES.application = Ember.Handlebars.compile('{{#flashMessage}}<span class="message">{{message}}</span>{{/flashMessage}}');

var findMessage = function() {
  return $('#qunit-fixture .message');
};

var messageExists = function() {
  return findMessage().length > 0;
};

var assertMessage = function() {
  return ok(messageExists());
};

var assertNoMessage = function() {
  return ok(!messageExists());
};

var router = function() {
  return App.__container__.lookup('route:application');
};

App.setupForTesting();

module("Integration App Test", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
  }
});

test("should not see the flash if there is no message", function() {
  visit("/")
    .then(function() {
      assertNoMessage();
    });
});

test("should not see the flash message if there has not been a transition", function() {
  visit("/")
    .then(function() {
      router().flashMessage('hello world');
    })
    .then(function() {
      assertNoMessage();
    });
});

test("should see a flash message when I transition to the next route", function() {
  expect(2);

  visit("/")
    .then(function() {
      router().flashMessage('hello world');
    })
    .visit("/page1")
    .then(function() {
      assertMessage();
    })
    .then(function() {
      equal(findMessage().text().trim(), 'hello world');
    });
});

test("should not see a flash message once it has been displayed", function() {
  visit("/")
    .then(function() {
      router().flashMessage('test');
    })
    .visit("/page1")
    .then(function() {
      assertMessage();
    })
    .visit("/page2")
    .then(function() {
      assertNoMessage();
    });
});

test("should not display or destroy the flash message when in the loading route", function() {
  visit("/")
    .then(function() {
      router().flashMessage('test');
    })
    .visit("/promise")
    .then(function() {
      assertMessage();
    });
});
