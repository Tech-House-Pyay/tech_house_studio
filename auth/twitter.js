var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../model/User');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({_id: id.doc._id}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: "ALyeJglk1Uw0N3L52cXAYTenJ",
    consumerSecret: "NsbRdJhvES5LJl1HCiKxy2jA6tjV2Dm5yt2J1N5h1sjHfpvDPRF",
    callbackURL: "https://techhouse-studio.herokuapp.com/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;
