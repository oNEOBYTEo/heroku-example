// Models
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.getAllComments = catchAsync(async (req, res, next) => {
  // SELECT * FROM comments
  // WHERE status = 'active'
  // JOIN users ON comments.userId = users.id
  const comments = await Comment.findAll({
    where: { status: 'active' },
    include: [{ model: User }]
  });

  if (!comments) {
    return next(new AppError(404, 'Data Not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { comments }
  });
});

exports.getCommentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findOne({
    where: { status: 'active', id }
  });

  if (!comment) {
    return next(new AppError(404, 'Not Comment Found By ID'));
  }

  res.status(200).json({
    status: 'success',
    data: { comment }
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const { text, postId, userId } = req.body;

  if (!text || !postId || !userId) {
    return next(new AppError(400, 'Must provide text, postId and userId'));
  }

  const newComment = await Comment.create({
    text,
    postId,
    userId
  });

  res.status(201).json({
    status: 'success',
    data: { newComment }
  });
});
