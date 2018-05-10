const { Users } = require('../models');

exports.getUserById = (req, res, next) => {
  const { user_id } = req.params;
  return Users.find({ _id: user_id })
    .then(result => res.status(200).send({ result }))
    .catch(err => {
      next({ status: 400 });
    });
};
