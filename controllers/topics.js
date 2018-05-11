const { Topics, Articles } = require('../models');

exports.getTopics = (req, res, next) => {
  return Topics.find()
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};

exports.getArticlesByTopic = (req, res, next) => {
  const { topic_id } = req.params;
  return Articles.find({ belongs_to: topic_id })
    .populate('belongs_to', 'title')
    .populate('created_by', 'username')
    .then(result => {
      return result.length === 0
        ? next({ status: 404 })
        : res.status(200).send({ result });
    })
    .catch(err => {
      next({ status: 400 });
    });
};

exports.addArticle = (req, res, next) => {
  const { topic_id } = req.params;
  const newArticle = new Articles(req.body);
  newArticle
    .save()
    .then(newArticleDoc =>
      res.status(201).send({ message: 'New article added', newArticleDoc })
    )
    .catch(err => {
      next({ status: 400 });
    });
};
