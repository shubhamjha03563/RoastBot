const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');

// GET  /summary
exports.getSummary = asyncHandler(async (req, res, next) => {
  let summary = await User.aggregate([
    { $project: { _id: 0, user: '$senderId', name: '$username', messages: 1 } },
    {
      $lookup: {
        from: 'messages',
        localField: 'messages',
        foreignField: '_id',
        as: 'messages',
      },
    },
  ]);

  res.json({
    success: true,
    message: 'Summary fetched.',
    data: { summary },
  });

  return next();
});
