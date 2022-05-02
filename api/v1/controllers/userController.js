const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');

// GET  /summary
exports.updateUser = asyncHandler(async (req, res, next) => {
  let { senderId, username } = req.body;
  let user = await User.findOneAndUpdate({ senderId }, { username });

  res.json({
    success: true,
    message: 'User updated.',
    data: { user },
  });

  return next();
});
