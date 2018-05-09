const app = require('express')();
const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/northcoders_news';

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Connected to db at ${DB_URL}`);
  })
  .catch(console.log);

module.exports = app;
