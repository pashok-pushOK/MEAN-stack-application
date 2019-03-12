const userSchema = require('../models/user.model');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        res.send('Hello world');
    });

    return router;
};