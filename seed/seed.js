const mongoose = require('mongoose');
const { Users, Articles, Comments, Topics } = require('../models');
const { formatArticleData, formatComments } = require('../utils');

const { topicData, userData, articleData } = require('./devData');

const seedDB = (topicData, userData, articleData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topics.insertMany(topicData),
        Users.insertMany(userData),
        articleData
      ]);
    })
    .then(([topicDocs, userDocs, articleData]) => {
      return Promise.all([
        topicDocs,
        userDocs,
        Articles.insertMany(formatArticleData(articleData, topicDocs, userDocs))
      ]).then(([topicDocs, userDocs, articleDocs]) => {
        return Promise.all([
          topicDocs,
          userDocs,
          articleDocs,
          Comments.insertMany(formatComments(articleDocs, userDocs))
        ]);
      });
    })
    .catch(console.log);
};

module.exports = seedDB;
