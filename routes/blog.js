const postSchema = require('../models/blog.model');
const path = require('path');

module.exports = (router) => {

    router.post('/createNewArticle', (req, res) => {
        if (!req.body.blogInputCategory) {
            res.json({success: false, message: 'Enter a valid category name!'})
        } else if (!req.body.blogInputTitle) {
            res.json({success: false, message: 'Title must be longer than 3 characters!'})
        } else if (!req.body.blogInputText) {
            res.json({success: false, message: 'Blog text must not be empty!'})
        } else if (!req.files.blogInputImage) {
            res.json({success: false, message: 'Post without image is not a post!'})
        } else {
            const image = req.files.blogInputImage;
            const postObject = {
                blogCategory: req.body.blogInputCategory,
                blogImg: image.name,
                blogTitle: req.body.blogInputTitle,
                blogDesc: req.body.blogInputText,
                // blogAuthorName: req.body.userName
            };

            postSchema.create(postObject, (error, post) => {
                if (error) {
                    res.json({success: false, message: error})
                } else {
                    image.mv(path.resolve(__dirname, '../client/src/assets/uploads/posts', image.name), (error) => {
                        if (error) {
                            res.json({success: false, message: `Error: ${error}`})
                        } else {
                            res.json({success: true, message: 'Post created!'});
                        }
                    });
                }
            });
        }
    });

    router.get('/posts', (req, res) => {
        postSchema.find({}, (error, posts) => {
            if(error)
                res.json({success: false, message: error});
            else
                res.json({success: true, data: posts});
        });
    });

    return router;
};