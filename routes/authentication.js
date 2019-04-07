const userSchema = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcrypt-nodejs');

// const fileUpload = require('express-fileupload');
// const path = require('path');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if (!req.body.userEmail) {
            res.json({success: false, message: 'You must provide an email!'});
        } else if (!req.body.userName) {
            res.json({success: false, message: 'You must provide a username!'});
        } else if (!req.body.userPassword) {
            res.json({success: false, message: 'You must provide a password!'});
        } else if (!req.body.userCity) {
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
                if (error) {
                    if (error.code === 11000) {
                        res.json({success: false, message: 'User name or e-mail already exists!'});
                    } else {
                        if (error.errors) {
                            if (error.errors.userEmail) {
                                res.json({success: false, message: error.errors.userEmail.message});
                            } else {
                                if (error.errors.userName) {
                                    res.json({success: false, message: error.errors.userName.message});
                                } else {
                                    if (error.errors.userPassword) {
                                        res.json({success: false, message: error.errors.userPassword.message});
                                    } else {
                                        if (error.errors.userCity) {
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
                } else res.json({success: true, message: 'User Saved!'});
            });
        }
    });

    router.get('/checkEmail/:userEmail', (req, res) => {
        if (!req.params.userEmail) {
            res.json({success: false, message: 'E-mail was not provided!'})
        } else {
            userSchema.findOne({userEmail: req.params.userEmail}, (err, user) => {
                if (err) {
                    res.json({success: false, message: err})
                } else {
                    if (user) {
                        res.json({success: false, message: 'E-mail already exists!'})
                    } else {
                        res.json({success: true, message: 'E-mail is available!'})
                    }
                }
            })
        }
    });

    router.get('/checkUsername/:userName', (req, res) => {
        if (!req.params.userName) {
            res.json({success: false, message: 'User name was not provided!'})
        } else {
            userSchema.findOne({userName: req.params.userName}, (err, user) => {
                if (err) {
                    res.json({success: false, message: err})
                } else {
                    if (user) {
                        res.json({success: false, message: 'User name already exists!'})
                    } else {
                        res.json({success: true, message: 'User name is available!'})
                    }
                }
            })
        }
    });

    router.post('/login', (req, res) => {
        if (!req.body.userName) {
            res.json({success: false, message: 'You must provide a username!'})
        } else {
            if (!req.body.userPassword) {
                res.json({success: false, message: 'You must provide a password!'})
            } else {
                userSchema.findOne({userName: req.body.userName}, (error, user) => {
                    if (error) {
                        res.json({success: false, message: error})
                    } else {
                        if (user) {
                            // const validPassword = userSchema.comparePassword(req.body.userPassword);
                            const validPassword = bcrypt.compareSync(req.body.userPassword, user.userPassword);
                            if (!validPassword) {
                                res.json({success: false, message: `Password doesn\'t match`});
                            } else {
                                const token = jwt.sign({userId: user._id}, config.secret, {expiresIn: '24h'});
                                res.json({
                                    success: true,
                                    message: 'Password is correct!',
                                    token: token,
                                    user: {
                                        userName: user.userName
                                    }
                                });
                            }
                        } else {
                            res.json({success: false, message: 'Username is not found in database!'})
                        }
                    }
                });
            }
        }
    });

    router.get('/profile', (req, res) => {
        const token = req.headers['auth_token'];

        if (!token) {
            res.json({success: false, message: 'No token provided!'});
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.json({success: false, message: `Token invalid: ${err}`})
                } else {
                    userSchema.findById(decoded.userId)
                        .exec((err, user) => {
                            if (err) {
                                res.json({success: false, message: `Error: ${err}`});
                            } else {
                                if (!user) {
                                    res.json({success: false, message: 'User not found'});
                                } else {
                                    res.json({success: true, user: user});
                                }
                            }
                        })
                }
            });
        }
    });

    // router.post('/changeImage', (req, res) => {
    //
    //     if (!req.files) {
    //         res.send("File was not found");
    //         return;
    //     }
    //
    //     const image = req.files.image;
    //
    //     image.mv(path.resolve(__dirname, '../client/src/assets/uploads/avatars', image.name), (error) => {
    //         if(error) {
    //             res.json({success: false, message: `Error: ${error}`});
    //         } else {
    //             res.json({success: true, message: 'Image has been uploaded!'});
    //         }
    //     });
    // });

    return router;
};
