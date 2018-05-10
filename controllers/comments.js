const { Comments } = require('../models');

exports.voteOnComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;
  if (vote === 'up') {
    return Comments.findByIdAndUpdate(
      { _id: comment_id },
      { $inc: { votes: 1 } },
      { new: true }
    ).then(result => {
      res.status(200).send({ result });
    });
  } else if (vote === 'down')
    return Comments.findByIdAndUpdate(
      { _id: comment_id },
      { $inc: { votes: -1 } },
      { new: true }
    ).then(result => {
      res.status(200).send({ result });
    });
  else
    Comments.findByIdAndUpdate(
      { _id: comment_id },
      { $inc: { votes: 0 } },
      { new: true }
    )
      .then(result => {
        res.status(200).send({ result });
      })
      .catch(err => {
        next({ status: 400 });
      });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  return Comments.findByIdAndRemove({ _id: comment_id })
    .then(commentDoc => {
      return commentDoc === null
        ? next({ status: 404 })
        : res
            .status(200)
            .send({ message: `Comment ${commentDoc._id} has been deleted` });
    })
    .catch(err => {
      next({ status: 400 });
    });
};
