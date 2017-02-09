require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// @TODO: Add error handling for failed connection
mongoose.connect(process.env.DB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.listen(port);
console.log('connected on ' + port);