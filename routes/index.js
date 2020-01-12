var express = require('express');
var router = express.Router();
var passport = require('passport');
const bcrypt = require('bcrypt');

var Product = require('../models/product');
var User = require('../models/user');
var Cart = require('../models/cart');
var validation = require('../helpers/dataValidation/validation');


router.get('/', (req, res, next) =>{
  Product.find()
    .then(result => {
      res.render('shop/index', { title: 'Shopping Cart', products: result });
    }).catch(err => {
      console.log("err", err);
    })
});

router.get('/add-to-cart/:id', (req, res)=> {
  let productId=req.params.id;
  let oldCart=req.session.cart ? req.session.cart :{}
  const cart=new Cart(oldCart);

  Product.findById(productId)
    .then(product => {
      console.log("product result",product);
      cart.add(product,product._id);
      req.session.cart=cart;
      console.log("cart",req.session.cart);
      res.redirect('/');
      
    }).catch(err => {
      console.log("err", err);
      return res.redirect('/');
    })
})

router.get('/shopping-cart',(req, res)=>{
  if (!req.session.cart) {
    return res.render('shop/shoppingCart',{products:null});
  }
  let oldCart=req.session.cart;
  const cart=new Cart(oldCart);
  return res.render('shop/shoppingCart',{products:cart.gererateArray,totalPrice:cart.totalPrice});
})

module.exports = router;
