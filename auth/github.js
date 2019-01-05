var passport = require('passport')
  , GitHubStrategy = require('passport-github').Strategy;
var User = require('../model/User');

passport.use(new GitHubStrategy({
    clientID: "84c826bd38c3d0a76b12",
    clientSecret: "78d468fe55cc065df36a9804a6e181f3c4b795cc",
    callbackURL: "https://techhouse-studio.herokuapp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({userid: profile.id}, {name: profile.displayName,userid: profile.id}, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;
