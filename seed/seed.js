const mongoose = require('mongoose');
const { Users, Articles, Comments, Topics } = require('../models');
const { formatArticleData, formatComments } = require('../utils');

const { topicData, userData, articleData } = require('./devData');

const seedDB = (topicData, userData, articleData, commentData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topics.insertMany(topicData),
        Users.insertMany(userData),
        articleData,
        commentData
      ]);
    })
    .then(([topicDocs, userDocs, articleData, commentData]) => {
      return Promise.all([
        topicDocs,
        userDocs,
        Articles.insertMany(
          formatArticleData(articleData, topicDocs, userDocs)
        ),
        commentData
      ]).then(([topicDocs, userDocs, articleDocs, commentData]) => {
        return Promise.all([
          topicDocs,
          userDocs,
          articleDocs,
          Comments.insertMany(
            formatComments(commentData, articleDocs, userDocs)
          )
        ]);
      });
    })
    .catch(console.log);
};

module.exports = seedDB;
