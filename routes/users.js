const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/users');

router.route('/:user_id').get(getUserById);

module.exports = router;
