var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../model/User');

passport.use(new GoogleStrategy({
    clientID: "24893510278-t9l20bl7m9tedbi6kgikr2boidqmrm4a.apps.googleusercontent.com",
    clientSecret: "GOBIESvbiQJEqFLhwpsIZwYW",
    callbackURL: "https://techhouse-studio.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({userid:profile.id},function (err,user) {
      if(err) {
        return done(err);
      }
      if(user){
        return done(null, user);
      }else {
        var user = new User();
        user.name = profile.displayName;
        user.userid = profile.id;
        user.save(function (err2,rtn2) {
          if(err2) throw err2;
          return done(null, user);
        })
      }
    })
    console.log(profile);
  }
));

module.exports = passport;
