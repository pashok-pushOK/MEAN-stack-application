const express = require('express');
const app = express();
const router = express.Router();
const port = 80;
const path = require('path');
const mongoose = require('mongoose');
const Database = require('./config/database');
const authentication = require('./routes/authentication')(router);

// mongoose connection
mongoose.connect(Database.uri, {useNewUrlParser: true}, (error) => {
    if(error) throw new error;
    else
        console.log(`Connected to ${Database.db} database !`);
});

app.use(express.static(__dirname + '/client/dist'));
app.use('/authentication', authentication);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(port, () => {
    console.log(`App is listening on ${port} port`);
});