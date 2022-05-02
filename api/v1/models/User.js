const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: [true, "User's {senderId} not provided."],
  },
  username: { type: String, default: null },
  messages: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Message',
  },
});

module.exports = mongoose.model('user', UserSchema);
