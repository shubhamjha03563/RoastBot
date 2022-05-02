const axios = require('axios');

exports.saveMessage = async (chatContext) => {
  const messageObj = {
    senderId: chatContext.event._rawEvent.sender.id,
    content: chatContext.event._rawEvent.message,
  };
  try {
    let data = await axios.post(
      `${process.env.API_DOMAIN}/messages`,
      messageObj
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (chatContext) => {
  const userObj = {
    senderId: chatContext.event._rawEvent.sender.id,
    username: chatContext.event.text,
  };

  try {
    let data = await axios.post(
      `${process.env.API_DOMAIN}/users/update`,
      userObj
    );
    // console.log(data.data);
  } catch (error) {
    console.log(error);
  }
};
