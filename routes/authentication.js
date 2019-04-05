const userSchema = require('../../MEAN-stack-application1/models/user.model');
const bcrypt = require('bcrypt-nodejs');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if(!req.body.userEmail) {
            res.json({success: false, message: 'You must provide an email!'});
        } else if (!req.body.userName) {
            res.json({success: false, message: 'You must provide a username!'});
        } else if(!req.body.userPassword) {
            res.json({success: false, message: 'You must provide a password!'});
        } else if(!req.body.userCity) {
            res.json({success: false, message: 'You must provide a city!'});
        } else {
            const user = new userSchema({
                userName: req.body.userName,
                userEmail: req.body.userEmail.toLowerCase(),
                userPassword: req.body.userPassword,
                userCity: req.body.userCity,
                userAdress: req.body.userAdress
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
                                        if(error.errors.userCity) {
                                            res.json({success: false, message: error.errors.userCity.message});
                                        } else {
                                            res.json({success: false, message: error})
                                        }
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

    router.get('/checkEmail/:userEmail', (req, res) => {
        if(!req.params.userEmail) {
            res.json({success: false, message: 'E-mail was not provided!'})
        } else {
            userSchema.findOne({userEmail: req.params.userEmail}, (err, user) => {
                if(err) {
                    res.json({success: false, message: err})
                } else {
                    if(user) {
                        res.json({success: false, message: 'E-mail already exists!'})
                    } else {
                        res.json({success: true, message: 'E-mail is available!'})
                    }
                }
            })
        }
    });

    router.get('/checkUsername/:userName', (req, res) => {
        if(!req.params.userName) {
            res.json({success: false, message: 'User name was not provided!'})
        } else {
            userSchema.findOne({userName: req.params.userName}, (err, user) => {
                if(err) {
                    res.json({success: false, message: err})
                } else {
                    if(user) {
                        res.json({success: false, message: 'User name already exists!'})
                    } else {
                        res.json({success: true, message: 'User name is available!'})
                    }
                }
            })
        }
    });

    router.post('/login', (req, res) => {
        if(!req.body.userName) {
            res.json({success: false, message: 'You must provide a username!'})
        } else {
            if(!req.body.userPassword) {
                res.json({success: false, message: 'You must provide a password!'})
            } else {
                userSchema.findOne({userName: req.body.userName}, (error, user) => {
                    if(error) {
                        res.json({success: false, message: error})
                    } else {
                        if(user) {
                            let password = user.userPassword;
                            bcrypt.compare(req.body.userPassword, password, (err) => {
                                if(err) {
                                    res.json({success: false, message: 'User name found, but password is not correct for provided username!'})
                                } else {
                                    res.json({success: true, message: 'Password is correct!'})
                                }
                            });
                        } else {
                            res.json({success: false, message: 'Username is not found in database!'})
                        }
                    }
                });
            }
        }
    });

    return router;
};
