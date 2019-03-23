const express = require('express');
const app = express();
const router = express.Router();
const port = 80;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Database = require('./config/database');
const authentication = require('./routes/authentication')(router);

const cors = require('cors');

// mongoose connection
mongoose.connect(Database.uri, {useNewUrlParser: true, useCreateIndex: true}, (error) => {
    if (error) throw new error;
    else console.log(`Connected to ${Database.db} database !`);
});

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// express static folder
app.use(express.static(__dirname + '/client/dist'));

// cors
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// requests
app.use('/authentication', authentication);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(port, () => {
    console.log(`App is listening on ${port} port`);
});
