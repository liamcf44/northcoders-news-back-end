const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleById,
  getCommentsByArticle,
  addCommentToArticle,
  voteOnArticle
} = require('../controllers/articles');

router.route('/').get(getArticles);

router
  .route('/:article_id')
  .get(getArticleById)
  .put(voteOnArticle);

router
  .route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(addCommentToArticle);

module.exports = router;
