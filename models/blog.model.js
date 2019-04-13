const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blogCategory: String,
    blogId: {
        unique: true,
        type: String
    },
    blogImg: {
        type: String
    },
    blogTitle: {
        unique: true,
        type: String
    },
    blogDesc: String,
    blogDatePublication: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    blogComments: Number,
    blogAuthorId: String,
    blogAuthorName: String
});

const Blog = mongoose.model('Post', blogSchema);

module.exports = Blog;