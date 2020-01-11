const { check, validationResult } = require('express-validator');

let validationObj={};

validationObj.signupSchema=[
        check('email').isEmail(),
        check('password').notEmpty().isLength({ min: 5 })
      ];

validationObj.signupValidation=(req)=>{
      const errors = validationResult(req);
      return errors;
}

module.exports=validationObj;