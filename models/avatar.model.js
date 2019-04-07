const mongoose = require('mongoose');

const avatarSchema = mongoose.Schema({
    avatar: {
        type: String,
        default: 'no-photo.png'
    }
});

const avatar = mongoose.model('Avatar', avatarSchema);

module.exports = avatar;
