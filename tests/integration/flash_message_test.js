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
  this.route('fromController');
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

App.FromControllerController = Ember.Controller.extend({
  needs: 'flashMessage'.w(),

  actions: {
    showMessage: function() {
      var flashMessage = this.get('controllers.flashMessage');
      flashMessage.set('message', 'testing');
    }
  }
});

var ApplicationTemplate = Ember.Handlebars.compile('{{#flashMessage}}<span class="message">{{message}}</span>{{/flashMessage}}');

Ember.TEMPLATES.application = ApplicationTemplate;

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

test("should be able to use the flash messenger from a controller", function() {
  visit("/");

  andThen(function() {
    assertNoMessage();
  });

  visit("/fromController");

  andThen(function() {
    assertNoMessage();
  });

  andThen(function() {
    App.__container__.lookup('controller:fromController')
      .send('showMessage');
  });

  andThen(function() {
    assertMessage();
  });
});

module("child template contains flash message template", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
    Ember.TEMPLATES.application = Ember.Handlebars.compile('{{outlet}}');
    Ember.TEMPLATES.posts = ApplicationTemplate;
  },

  teardown: function() {
    Ember.TEMPLATES.application = ApplicationTemplate;
    Ember.TEMPLATES.posts = undefined;
  }
});

test("it shows flash messages on child route", function() {
  expect(2);

  visit("/");

  andThen(function() {
    router().flashMessage('test');
  });

  visit("/posts");

  andThen(assertMessage);

  andThen(function() {
    equal(findMessage().text().trim(), 'test');
  });
});
