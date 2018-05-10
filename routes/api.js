const express = require('express');
const router = express();

const topicsRouter = require('./topics');
router.use('/topics', topicsRouter);

const articlesRouter = require('./articles');
router.use('/articles', articlesRouter);

const commentsRouter = require('./comments');
router.use('/comments', commentsRouter);

const usersRouter = require('./users');
router.use('/users', usersRouter);

router.set('view-engine', 'ejs');

router.get('/', (req, res, next) => {
  res.render('api.ejs');
});

module.exports = router;
