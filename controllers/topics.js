const { Topics, Articles } = require('../models');

exports.getTopics = (req, res, next) => {
  return Topics.find()
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};

exports.getArticlesByTopic = (req, res, next) => {
  const { topic_id } = req.params;
  return Articles.find({ belongs_to: topic_id })
    .then(result => res.status(200).send({ result }))
    .catch(err => {
      next({ status: 400 });
    });
};
