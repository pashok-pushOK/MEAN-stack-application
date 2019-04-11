const avatarSchema = require('../models/avatar.model');
const fileUpload = require('express-fileupload');
const path = require('path');

module.exports = (router) => {

    router.post('/changeImage', (req, res) => {
        if (!req.files) {
            res.send("File was not found");
            return;
        }

        const image = req.files.image;

        image.mv(path.resolve(__dirname, '../client/src/assets/uploads/avatars', image.name), (error) => {
            if(error) {
                res.json({success: false, message: `Error: ${error}`});
            } else {
                avatarSchema.create({
                    avatar: image.name,
                    userId: req.body.userId
                }, (err, avatar) => {
                    if(err) {
                        res.json({success: false, message: err})
                    } else {
                        res.json({success: true, message: 'Image has been uploaded!'});
                    }
                });
            }
        });
    });

    router.post('/:userName', (req, res) => {
        avatarSchema.findOne({userId: req.body.userId}, (error, user) => {
            if(error) {
                res.json({success: false, message: error})
            } else {
                if(!user) {
                    res.json({success: false, message: 'User not found by id'})
                } else {
                    res.json({success: true, userId: user.userId, userPhoto: user.avatar})
                }
            }
        });
    });

    router.post('/updatePhoto/:userName', (req, res) => {
        if (!req.files) {
            res.send("File was not found");
            return;
        }

        const image = req.files.image;

        avatarSchema.updateOne({userId: req.body.userId}, {$set: {avatar: image.name}}, (err, changes) => {
            if(err) {
                res.json({success: false, message: err})
            } else {
                image.mv(path.resolve(__dirname, '../client/src/assets/uploads/avatars', image.name), (error) => {
                    if(error) {
                        res.json({success: false, message: `Error: ${error}`})
                    } else {
                        res.json({success: true, message: 'Success!'})
                    }
                });
            }
        });
    });

    return router;
};
