var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var User = new mongoose.Schema({

    email: { type: String, required: true },
    password: { type: String, required: true },
});

User.methods.encryptPassword = (password) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return err;
            return password = hash;
        }
        )
    })
}

User.methods.validPassword = (password) => {
    bcrypt.compare(password, this.password).then(isMatch => {
        if (isMatch) {
            return isMatch
        }else{
            return !isMatch
        }
    })
}

module.exports = mongoose.model('User', User);