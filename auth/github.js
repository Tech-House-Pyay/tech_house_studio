var passport = require('passport')
  , GitHubStrategy = require('passport-github').Strategy;
var User = require('../model/User');

passport.use(new GitHubStrategy({
    clientID: "84c826bd38c3d0a76b12",
    clientSecret: "78d468fe55cc065df36a9804a6e181f3c4b795cc",
    callbackURL: "https://techhouse-studio.herokuapp.com/auth/github/callback"
    // clientID: "2e22546ebc3e4e96426b",
    // clientSecret: "b2a4370f9b6966e92b852b85fafc70c46344b24d",
    // callbackURL: "http://localhost:3000/auth/github/callback"
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
