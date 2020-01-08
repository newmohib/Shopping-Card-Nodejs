var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var User = require('../models/user')


let getUserById=(id)=>{
  User.findOne({ _id: id }, (err, user) => {
    console.log("getUserById",err,user);
     if (err) {
       return false;
     }else{
       return true;
     }
  })
}

function initialize() {

  const authenticateUser = (email, password, done) => {
console.log("email password",email, password);
    User.findOne({ email: email }, (err, user) => {

      if (err) {
        return done(null, false, { message: 'No user with that email' })
      }

      bcrypt.compare(password, user.password, function (err, result) {
        console.log("Password Test",user, err, result);
        if (result) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })

        }
      });

      // try {
      //     if (await bcrypt.compare(password,user.password)) {
      //         return done(null, user)

      //     } else {
      //         return done(null, false, {message:'Password incorrect'})

      //     }
      // } catch (e) {
      //     return done(e)

      // }

    })

  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((id, done) =>  done(null, getUserById(id)))
}



module.exports = initialize