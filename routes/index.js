var express = require('express');
var router = express.Router();
var passport = require('passport');
const bcrypt = require('bcrypt');

var Product = require('../models/product');
var User = require('../models/user');
var validation = require('../helpers/dataValidation/validation');


router.get('/', function (req, res, next) {
  Product.find()
    .then(result => {
      res.render('shop/index', { title: 'Shopping Cart', products: result });
    }).catch(err => {
      console.log("err", err);
    })
});

router.post('/user/signup-test', (req, res) => {
  User.save((err, result) => {
  })
  res.send("success")
})

router.get('/user/signup', (req, res) => {
  let errMessages = req.flash("error");
  console.log("errMessages", errMessages);
  res.render('user/signup', { message: errMessages, hasErrors: errMessages.length > 0 });
})

router.post('/user/signup', validation.signupSchema, (req, res) => {
  console.log("submit success", req.body);
  let email = req.body.email;
  let password = req.body.password;
  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      User.findOne({ email: email }, function (err, user) {
        if (user) { req.flash('error', 'Email Alredy Exist');; return res.redirect('/user/signup') };
        let errors = validation.signupValidation(req);
        if (!errors.isEmpty()) {
          //this use for
          // const newErrors = [...new Set(errors.errors)];
          var messages = [];
          errors.errors.forEach((error) => {
            messages.push(error.param + ' ' + error.msg)
          })
          req.flash('error', messages);
          return res.redirect('/user/signup')
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = hashedPassword
        newUser.save((err) => {
          if (err) {return res.redirect('/user/signup')}
          return res.redirect('/user/signin')
        });
      });
    }).catch(err => {
      console.log("password hashing Err");
      return res.redirect('/user/signup')
    })
})

router.get('/user/profile', checkAuthenticated, (req, res) => {
  res.render('user/profile');
})

router.get('/user/signin', checkNotAuthenticated, (req, res) => {
  let errMessages = req.flash("error");
  res.render('user/signin', { message: errMessages, hasErrors: errMessages.length > 0 });
})

router.post('/user/signin', passport.authenticate('local', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/user/signin')
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/user/profile')
}

module.exports = router;
