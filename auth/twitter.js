var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../model/User');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  console.log(id);
  User.findOne({_id: id._id}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: "ALyeJglk1Uw0N3L52cXAYTenJ",
    consumerSecret: "NsbRdJhvES5LJl1HCiKxy2jA6tjV2Dm5yt2J1N5h1sjHfpvDPRF",
    callbackURL: "https://techhouse-studio.herokuapp.com/auth/twitter/callback"
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
