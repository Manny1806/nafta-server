const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')

const {PORT, CLIENT_ORIGIN} = require('./config')

mongoose.Promise = global.Promise

const app = express();

