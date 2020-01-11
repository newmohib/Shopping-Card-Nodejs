var express = require('express');
var router = express.Router();
var passport = require('passport');
const bcrypt = require('bcrypt');
var User = require('../models/user');
var validation = require('../helpers/dataValidation/validation');
var authenticate = require('../helpers/authenticate');



router.get('/profile', authenticate.isLoggedIn, (req, res) => {
    res.render('user/profile');
})

router.get('/logout',  (req, res) => {
    console.log("logout");
    req.logout();
    res.redirect('/');
})

router.use('/', authenticate.notLoggedIn, (req, res, next) => {
    next()
})

router.get('/signup', (req, res) => {
    let errMessages = req.flash("error");
    console.log("errMessages", errMessages);
    res.render('user/signup', { message: errMessages, hasErrors: errMessages.length > 0 });
})

router.post('/signup', validation.signupSchema, (req, res) => {
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
                    if (err) { return res.redirect('/user/signup') }
                    return res.redirect('/user/signin')
                });
            });
        }).catch(err => {
            console.log("password hashing Err");
            return res.redirect('/user/signup')
        })
})

router.get('/signin', (req, res) => {
    let errMessages = req.flash("error");
    res.render('user/signin', { message: errMessages, hasErrors: errMessages.length > 0 });
})

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}))

module.exports = router;