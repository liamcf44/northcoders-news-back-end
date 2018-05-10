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

exports.createComments = () => {
  return Array.from({ length: Math.floor(Math.random() * 100 + 1) }, () => {
    return {
      body: faker.lorem.paragraph(),
      belongs_to: '',
      created_at: new Date().getTime(),
      votes: Math.floor(Math.random() * 100 + 1),
      created_by: ''
    };
  });
};

exports.formatComments = (commentData, articleDocs, userDocs) => {
  return commentData.map(comment => {
    return {
      body: comment.body,
      belongs_to: _.sample(articleDocs)._id,
      created_at: comment.created_at,
      votes: comment.votes,
      created_by: _.sample(userDocs)._id
    };
  });
};
