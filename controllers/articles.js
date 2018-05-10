const { Articles, Comments } = require('../models');

exports.getArticles = (req, res, next) => {
  return Articles.find()
    .then(articles => res.status(200).send({ articles }))
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return Articles.find({ _id: article_id })
    .then(result => res.status(200).send({ result }))
    .catch(err => {
      next({ status: 400 });
    });
};

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  return Comments.find({ belongs_to: article_id })
    .then(comments => res.status(200).send({ comments }))
    .catch(err => {
      next({ status: 400 });
    });
};

exports.addCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = new Comments(req.body);
  newComment
    .save()
    .then(newCommentDoc => res.status(201).send({ newCommentDoc }))
    .catch(err => {
      next({ status: 400 });
    });
};
