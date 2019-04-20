const posts = require('../models/blog.model');

module.exports = (router) => {

    router.get('/:post', (req, res) => {
        console.log(req.params.post);

        posts.findOne({blogTitle: req.params.post}, (err, posts) => {
            if (err)
                res.json({success: false, message: err});
            if (!posts)
                res.json({success: false, message: 'Nothing was found by your request'});
            else
                res.json({
                    success: true,
                    data: {
                        postId: posts._id,
                        postCategory: posts.blogCategory,
                        postImg: posts.blogImg,
                        postTitle: posts.blogTitle,
                        postDesc: posts.blogDesc,
                        postDatePublication: posts.blogDatePublication,
                        postComments: posts.blogComments,
                        postAuthor: posts.blogAuthorName
                    }
                })
        });
        // res.json({success: true});
    });

    return router;
};