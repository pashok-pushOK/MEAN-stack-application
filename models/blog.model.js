const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blogCategory: String,
    blogImg: String,
    blogTitle: String,
    blogDesc: String,
    blogDatePublication: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    blogComments: {
        type: Number,
        default: 0
    },
    blogAuthorName: {
        type: String,
        default: 'Guest'
    }
});

const Blog = mongoose.model('Post', blogSchema);

module.exports = Blog;