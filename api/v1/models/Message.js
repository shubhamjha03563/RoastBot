const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: [true, '{senderId} not provided for message'],
  },
  content: {
    type: Object,
    required: [true, '{content} object not provided for message'],
  }, // messages can be of any format
});

module.exports = mongoose.model('message', MessageSchema);
