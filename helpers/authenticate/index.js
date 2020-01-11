

let authenticateObj={};

authenticateObj.isLoggedIn =(req, res, next)=> {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

authenticateObj.notLoggedIn=(req, res, next)=> {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/user/profile')
}

module.exports=authenticateObj;