const express = require('express');
const router = express.Router();
const {
  getTopics,
  getArticlesByTopic,
  addArticle
} = require('../controllers/topics');

router.route('/').get(getTopics);

router
  .route('/:topic_id/articles')
  .get(getArticlesByTopic)
  .post(addArticle);

module.exports = router;
