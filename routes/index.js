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

module.exports = router;
