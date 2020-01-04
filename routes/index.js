var express = require('express');
var router = express.Router();
var Product=require('../models/product')

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find().then(result=>{
    res.render('shop/index', { title: 'Shopping Cart',products:result });

  }).catch(err=>{
    console.log("err",err);
  })
});

module.exports = router;
