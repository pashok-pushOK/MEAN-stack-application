const avatarSchema = require('../models/avatar.model');
const path = require('path');

module.exports = (router) => {

    router.post('/changeImage', (req, res) => {
        if (!req.files) {
            res.send("File was not found");
            return;
        }

        const image = req.files.image;

        image.mv(path.resolve(__dirname, '../client/src/assets/uploads/avatars', image.name), (error) => {
            if (error) {
                res.json({success: false, message: `Error: ${error}`});
            } else {
                avatarSchema.create({
                    avatar: image.name,
                    userId: req.body.userId
                }, (err, avatar) => {
                    if (err) {
                        res.json({success: false, message: err})
                    } else {
                        res.json({success: true, message: 'Image has been uploaded!'});
                    }
                });
            }
        });
    });

    router.post('/:userName/:id', (req, res) => {
        avatarSchema.findOne({userId: req.params.id}, (error, user) => {
            if (error)
                res.json({success: false, message: `Error: ${error}`});
            if (!user)
                res.json({success: false, message: 'User not found! here'});
            else {
                res.json({
                    success: true,
                    message: 'Success',
                    data: {
                        userPhoto: user.avatar
                    }
                });
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
            if (err) {
                res.json({success: false, message: err})
            } else {
                image.mv(path.resolve(__dirname, '../client/src/assets/uploads/avatars', image.name), (error) => {
                    if (error) {
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
