var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var User = require('../models/user')

function initialize() {

  const authenticateUser = (email, password, done) => {
    User.findOne({ email: email })
    .then((user)=>{
      console.log("success",user);
      bcrypt.compare(password, user.password, (err, result)=> {
        console.log("Password Test", user, err, result);
        if (result) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      });
    }).catch(err=>{
      return done(null, false, { message: 'No user with that email' })
    })

  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser( (user, done)=> { done(null, user.id); });

  passport.deserializeUser( (id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });

}

module.exports = initialize