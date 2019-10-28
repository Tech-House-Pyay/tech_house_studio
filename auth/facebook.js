var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/User');


passport.use(new FacebookStrategy({
    // clientID: "300669657250432",
    // clientSecret: "6cc118ac742ca9c9dce7a26d50297ec9",
    // callbackURL: "https://techhouse-studio.herokuapp.com/auth/facebook/callback"
    clientID: "528343547737382",
    clientSecret: "9234730990d5ed3b499b14a10becbe84",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
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
