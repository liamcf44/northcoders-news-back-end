const _ = require('lodash');
const faker = require('faker');
const { Comments } = require('../models');

exports.formatArticleData = (articleData, topicDocs, userDocs) => {
  return articleData.map(article => {
    return {
      title: article.title,
      body: article.body,
      belongs_to: topicDocs.reduce((acc, topic) => {
        article.topic === topic.slug ? (acc = topic.id) : null;
        return acc;
      }, ''),
      votes: article.votes,
      created_by: _.sample(userDocs)._id
    };
  });
};

exports.createComments = (userData, articleData) => {
  return Array.from({ length: Math.floor(Math.random() * 100 + 1) }, () => {
    return {
      body: faker.lorem.paragraph(),
      belongs_to: _.sample(articleData).title,
      created_at: new Date().getTime(),
      votes: Math.floor(Math.random() * 100 + 1),
      created_by: _.sample(userData).username
    };
  });
};

exports.formatComments = (commentData, articleDocs, userDocs) => {
  return commentData.map(comment => {
    return {
      body: comment.body,
      belongs_to: articleDocs.reduce((acc, article) => {
        if (article.title === comment.belongs_to) acc = article._id;
        return acc;
      }, ''),
      created_at: comment.created_at,
      votes: comment.votes,
      created_by: userDocs.reduce((acc, user) => {
        if (user.username.toLowerCase() === comment.created_by.toLowerCase())
          acc = user._id;
        return acc;
      }, '')
    };
  });
};
