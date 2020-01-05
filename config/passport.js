var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User=require('../models/user')


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  })


  passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {

        if (err) { return done(err); }
        if (user) { return done(null, false,{message:'Email is already in use.'}); }
        var newUser=new User();
        newUser.email=email;
        newUser.password=password;
      });
    }
  ));