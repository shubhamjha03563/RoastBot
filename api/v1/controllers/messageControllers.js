const asyncHandler = require('../middlewares/asyncHandler');
const Message = require('../models/Message');
const User = require('../models/User');
const AppError = require('../utils/AppError');

// GET  /messages/:id
exports.getMessage = asyncHandler(async (req, res, next) => {
  let messageId = req.params.id;
  let message = await Message.findById(messageId);
  if (!message) {
    return next(new AppError(`Message not found with the id - ${messageId}`));
  }

  res.json({ success: true, message: 'Message fetched.', data: { message } });
  return next();
});

// GET  /messages
exports.getAllMessages = asyncHandler(async (req, res, next) => {
  let messages = await Message.find();

  res.json({
    success: true,
    message: 'All messages fetched.',
    data: { count: messages.length, messages: messages },
  });
  return next();
});

// POST   /messages
exports.saveMessages = asyncHandler(async (req, res, next) => {
  const { senderId, content } = req.body;
  let message = await Message.create({
    content,
    senderId,
  });

  // add messages
  let user = await User.findOneAndUpdate(
    { senderId: message.senderId },
    { $push: { messages: message._id } },
    { new: true }
  );

  // create new user
  if (!user) {
    user = await User.create({
      senderId: message.senderId,
      messages: [message._id],
    });
  }

  res.json({
    success: true,
    message: 'Message saved.',
    data: { message },
  });
  return next();
});
