var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../model/User');

passport.use(new GoogleStrategy({
    clientID: "24893510278-t9l20bl7m9tedbi6kgikr2boidqmrm4a.apps.googleusercontent.com",
    clientSecret: "GOBIESvbiQJEqFLhwpsIZwYW",
    callbackURL: "https://techhouse-studio.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;
