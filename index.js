const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary');

const { dbConnect } = require('./db-mongoose');

const {PORT, CLIENT_ORIGIN} = require('./config')

const { router: usersRouter } = require('./routes/users');
const { jwtStrategy } = require('./auth/strategies');
const { localStrategy } = require('./auth/strategies');

const authRouter = require('./routes/auth')
const proRouter = require('./routes/pro-items');

mongoose.Promise = global.Promise

cloudinary.config({
    cloud_name: 'siouxcitymusic',
    api_key: '872932728226311',
    api_secret: '9HKSukbONUoBzBsIULQi9MZB-zA',
  });

const app = express();

app.use(express.json())

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//     if (req.method === 'OPTIONS') {
//       return res.sendStatus(204);
//     }
//     next();
// });

app.use(
    cors({
      origin: CLIENT_ORIGIN
    })
)

passport.use( localStrategy)
passport.use( jwtStrategy);

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter.router)
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