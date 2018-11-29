const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')

const {PORT, CLIENT_ORIGIN} = require('./config')

mongoose.Promise = global.Promise

const app = express();

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
    runServer();
}

module.exports = { app }