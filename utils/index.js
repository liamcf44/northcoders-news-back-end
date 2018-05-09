const _ = require('lodash');

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
