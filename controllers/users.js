const { Users } = require('../models');

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  return Users.find({ username: username })
    .then(result => {
      return result.length === 0
        ? next({ status: 404 })
        : res.status(200).send({ result });
    })
    .catch(err => {
      next({ status: 404 });
    });
};
