const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')

const { dbConnect } = require('./db-mongoose');

const {PORT, CLIENT_ORIGIN} = require('./config')

const proRouter = require('./routes/pro-items');

mongoose.Promise = global.Promise

const app = express();

app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
});

app.use('/api/pro', proRouter);

function runServer(port = PORT) {
    const server = app
    .listen(port, () => {
        console.info(`App listening on port ${server.address().port}`)
    })
    .on('error', err => {
        console.error("Express failed to start")
        console.error(err)
    })
}

if (require.main === module) {
    dbConnect();
    runServer();
}

module.exports = { app }