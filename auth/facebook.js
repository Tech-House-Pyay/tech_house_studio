var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/User');

passport.use(new FacebookStrategy({
    clientID: "300669657250432",
    clientSecret: "6cc118ac742ca9c9dce7a26d50297ec9",
    callbackURL: "https://techhouse-studio.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;
