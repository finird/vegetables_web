const express = require('express');
const morgan = require('morgan');

const homeRoute = require('./routes/homeRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/', homeRoute);
module.exports = app;
