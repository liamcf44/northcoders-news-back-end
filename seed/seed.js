const mongoose = require('mongoose');
const { Users, Articles, Comments, Topics } = require('../models');

const topicData = require('./devData/topics');
const userData = require('./devData/users');

const seedDB = (topicData, userData, articleData, commentData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topics.insertMany(topicData),
        Users.insertMany(userData)
      ]);
    })
    .catch(console.log);
};

module.exports = seedDB;
