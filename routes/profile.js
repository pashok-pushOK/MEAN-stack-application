const avatarSchema = require('../models/avatar.model');
const postSchema = require('../models/blog.model');
const fileUpload = require('express-fileupload');
const path = require('path');

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

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

    router.post('/:userName/create-new-article', (req, res) => {
        if(!req.body.blogInputCategory) {
            res.json({success: false, message: 'Enter a valid category name!'})
        } else if(!req.body.blogInputTitle) {
            res.json({success: false, message: 'Title must be longer than 3 characters!'})
        } else if(!req.body.blogInputText) {
            res.json({success: false, message: 'Blog text must not be empty!'})
        } else if(!req.files.blogInputImage) {
            res.json({success: false, message: 'Post without image is not a post!'})
        } else {
            const postObject = {
                blogCategory: req.body.blogInputCategory,
                blogId: req.body.blogInputTitle.toLowerCase(),
                blogImg: req.files.blogInputImage.name,
                blogTitle: req.body.blogInputTitle,
                blogDesc: req.body.blogInputText,
                blogAuthorId: req.body.userId,
                blogAuthorName: req.body.userName
            };
            postSchema.create(postObject, (error, post) => {
                if(error) {
                    res.json({success: false, message: error})
                } else {
                    req.files.blogInputImage.mv(path.resolve(__dirname, '../client/src/assets/uploads/posts', req.files.blogInputImage.name), (error) => {
                        if(error) {
                            res.json({success: false, message: `Error: ${error}`})
                        } else {
                            res.json({success: true, message: 'Success!'})
                        }
                    });

                    res.json({success: true, message: 'Post created!'});
                }
            });
        }
    });

    return router;
};
