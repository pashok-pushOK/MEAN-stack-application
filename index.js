const express = require('express');
const app = express();
const router = express.Router();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Database = require('./config/database');
const fileUpload = require('express-fileupload');

// routes
const authentication = require('./routes/authentication')(router);
const profile = require('./routes/profile')(router);
const blog = require('./routes/blog')(router);

// cors
const cors = require('cors');

// mongoose connection
mongoose.connect(Database.uri, {useNewUrlParser: true, useCreateIndex: true}, (error) => {
    if (error) throw new error;
    else console.log(`Connected to ${Database.db} database !`);
});

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// express static folder
app.use(express.static(__dirname + '/client/dist/client'));

// cors
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// express file-upload
app.use(fileUpload());

// requests
app.use('/authentication', authentication);
app.use('/profile', profile);
app.use('/blog/', blog);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(port, () => {
    console.log(`App is listening on ${port} port`);
});
