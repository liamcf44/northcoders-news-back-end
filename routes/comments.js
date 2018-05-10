const express = require('express');
const router = express.Router();
const { voteOnComment, deleteComment } = require('../controllers/comments');

router
  .route('/:comment_id')
  .put(voteOnComment)
  .delete(deleteComment);

module.exports = router;
