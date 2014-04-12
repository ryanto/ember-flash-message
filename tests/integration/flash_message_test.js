var App = Ember.Application.create({
  rootElement: '#qunit-fixture'
});

App.Router.map(function() {
  this.route('page1');
  this.route('page2');
  this.route('promise');
  this.resource('posts', { path: '/posts' }, function() {
    this.route('new');
  });
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
  visit("/");
  andThen(assertNoMessage);
});

test("should not see the flash message if there has not been a transition", function() {
  visit("/");

  andThen(function() {
    router().flashMessage('hello world');
  });

  andThen(assertNoMessage);
});

test("should see a flash message when I transition to the next route", function() {
  expect(2);

  visit("/");

  andThen(function() {
    router().flashMessage('hello world');
  });

  visit("/page1");

  andThen(assertMessage);

  andThen(function() {
    equal(findMessage().text().trim(), 'hello world');
  });
});

test("should not see a flash message once it has been displayed", function() {
  visit("/");

  andThen(function() {
    router().flashMessage('test');
  });

  visit("/page1");

  andThen(assertMessage);

  visit("/page2");

  andThen(assertNoMessage);
});

test("should not display or destroy the flash message when in the loading route", function() {
  visit("/");

  andThen(function() {
    router().flashMessage('test');
  });

  visit("/promise");

  andThen(assertMessage);
});

test("should display the flash message instantly", function() {
  visit("/");

  andThen(function() {
    router().flashMessage('instant message').now();
  });

  andThen(assertMessage);
});

test("should display the flash message for resource", function() {
  visit("/");

  andThen(function() {
    router().flashMessage('test');
  });

  visit("/posts/new");

  andThen(assertMessage);
});
