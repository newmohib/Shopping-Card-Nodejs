var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var passport = require('passport')
var User=require('../models/user')
/* GET home page. */
const bcrypt=require('bcrypt');
var session = require('express-session')
const initialize=require('../config/passport');


initialize()
  // router.use(passport.initialize());
  // router.use(passport.session());


router.get('/', function (req, res, next) {
  Product.find()
    .then(result => {
      res.render('shop/index', { title: 'Shopping Cart', products: result });
    }).catch(err => {
      console.log("err", err);
    })
});

router.post('/user/signup-test',(req,res)=>{
  User.save((err,result)=>{
  })
 res.send("success")
})

router.get('/user/signup',(req,res)=>{
  res.render('user/signup');
})

// router.post('/user/signup', passport.authenticate('local' , {
//   successRedirect :'/user/profile',
//   failureRedirect:'/user/signup',
//   failureFlash:true
// }))


router.post('/user/signup', (req,res)=>{
  console.log("submit success",req.body);
  let email=req.body.email;
  let password=req.body.password;
  console.log("1",password,email);
  try {
    console.log("2");
       bcrypt.hash(password ,10)
       .then(hashedPassword=>{
       //  var newUser=new User();
         console.log("3",email);
         User.findOne({ email: email }, function (err, user) {
          console.log("find user",err, user);
           if (err) { return done(err); }
           if (user) { return done(null, false,{message:'Email is already in use.'}); }
           
           var newUser=new User();
           newUser.email=email;
           newUser.password=hashedPassword
           console.log("password",newUser.password);
           newUser.save((err)=>{
             console.log("4",err);
             if (err) {
              res.redirect('/user/signup')
             }
             console.log("5");
             res.redirect('/user/signin')
            });
         });
        
       }).catch(err=>{
         console.log("password no hashing");
        res.redirect('/user/signup')
       })
      
  } catch (error) {
      res.redirect('/user/signup')
  }

})

router.get('/user/profile',(req,res)=>{
  res.render('user/profile');
})

router.get('/user/signin',(req,res)=>{
  res.render('user/signin');
})

router.post('/user/signin', passport.authenticate('local' , {
  successRedirect :'/user/profile',
  failureRedirect:'/user/signin',
  failureFlash:true
}))


// function checkAuthenticated(req,res,next){
//   if (req.isAuthenticated()) {
//       return next() 
//   }
//   res.redirect('/login')
// }

module.exports = router;
