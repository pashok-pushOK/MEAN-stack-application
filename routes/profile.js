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
                res.json({success: true, message: 'Image has been uploaded!'});
            }
        });
    });

    return router;
};
