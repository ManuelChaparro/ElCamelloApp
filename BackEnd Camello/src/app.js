'use strict'
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conn = require('../config/connections')
const userRoutes = require('../src/routes/users.routes.js');

//initialization
const app = express();

//settings
app.set('port', (process.env.PORT));
app.get(conn);

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//routes
app.use('/api', userRoutes);

module.exports = app;