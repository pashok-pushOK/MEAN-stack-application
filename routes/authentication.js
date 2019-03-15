const userSchema = require('../models/user.model');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if(!req.body.userEmail) {
            res.json({success: false, message: 'You must provide an email!'});
        } else if (!req.body.userName) {
            res.json({success: false, message: 'You must provide a username!'});
        } else if(!req.body.userPassword) {
            res.json({success: false, message: 'You must provide a password!'});
        } else {
            const user = new userSchema({
                userName: req.body.userName,
                userEmail: req.body.userEmail.toLowerCase(),
                userPassword: req.body.userPassword
            });
            user.save((error) => {
                if(error) {
                    if(error.code === 11000) {
                        res.json({success: false, message: 'User name or e-mail already exists!'});
                    } else {
                        if(error.errors) {
                            if (error.errors.userEmail) {
                                res.json({success: false, message: error.errors.userEmail.message});
                            } else {
                                if(error.errors.userName) {
                                    res.json({success: false, message: error.errors.userName.message});
                                } else {
                                    if(error.errors.userPassword) {
                                        res.json({success: false, message: error.errors.userPassword.message});
                                    } else {
                                        res.json({success: false, message: error})
                                    }
                                }
                            }
                        } else {
                            res.json({success: false, error: error});
                        }
                    }
                }
                else res.json({success: true, message: 'User Saved!'});
            });
        }
    });

    return router;
};