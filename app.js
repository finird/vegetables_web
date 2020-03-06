const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const homeRoute = require('./routes/homeRouter');

const app = express();

app.use(
  cors({
    optionsSuccessStatus: 200
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/', homeRoute);
module.exports = app;
