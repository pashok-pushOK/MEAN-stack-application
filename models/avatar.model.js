const mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
    avatar: {
        type: String,
        default: 'no-photo.png'
    },
    userId: {
        type: String,
        unique: true
    }
});

const avatar = mongoose.model('Avatar', avatarSchema);

module.exports = avatar;
