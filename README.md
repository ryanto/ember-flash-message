# Ember Flash Message

A simple plugin that allows you to display a message on the next route
transition, similiar to Rails' ``flash[:notice]``. This is useful for
displaying one time notices on later pages.

## Usage

You should include
[ember-flash-message.js](https://raw.github.com/ryanto/ember-flash-message/master/flash-message.js) on your page. Since this
plugin depends on Ember.js you will have to include Ember first. Now any
of your route's will have access to ``flashMessage(message)``, which
will set the message.

### Template

Any template that you want to display the message should contain the
following. It makes the most sense to put this in your ``application``
template to have the message be available on all pages.

```handlebars
{{#flashMessage}}
  {{message}}
{{/flashMessage}}
```

### Route

Any route can call ``this.flashMessage(message)`` to set the message.
The message will be displayed after the next transition. After the
router transitions for a second time the message will be destroyed.

```javascript
Ember.LoginRoute = Ember.Route.extend({
  actions: {
    login: function() {
      // login user ...
      this.flashMessage('Welcome back!');
      this.transitionTo('index');
    }
  }
});
```

#### Instant Message

There may be some instances where you want to display the message right
away and not wait for the route to transition. You can use the ``now()``
function to update the message.

```javascript
Ember.ProfileRoute = Ember.Route.extend({
  actions: {
    save: function(profile) {
      var router = this;

      profile.save().then(function() {
        router.flashMessage('Your profile has been updated!').now();
      });
    }
  }
});
```   

## Development

This plugin is built with rake pipeline, which requires Ruby. To get
started:

```
bundle install
rackup
```

Edit code and visit [http://localhost:9292](http://localhost:9292) to
run tests.
