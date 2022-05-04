const { daysUntilNext } = require('../helper/dateTime');
const { isPositiveSentiment } = require('../helper/nlpHandler');
const { saveMessage, updateUser } = require('../helper/saveData.js');
const replies = require('../helper/replies');

let previousText = ''; // keeping track of questions asked

module.exports = async function App(context) {
  let messageText = context.event.text;
  let options = {};
  let replyText = replies.defaultText; // default text if anything goes wrong

  // user starts the conversation
  if (
    (context.event.isPayload && context.event.payload === 'GET_STARTED') ||
    messageText === 'Hi' ||
    messageText === 'hi'
  ) {
    replyText = replies.askName;
  }
  // User provides his/ her name
  else if (previousText == replies.askName) {
    replyText = messageText;
    options = {
      quickReplies: [
        {
          contentType: 'text',
          title: 'Sure',
          payload: 'daysLeftYes',
        },
        {
          contentType: 'text',
          title: "No, I'm good.",
          payload: 'daysLeftNo',
        },
      ],
    };
    await updateUser(context);
  }
  // when user gives birthdate, then it's format is checked
  else if (context.event.isText && !!Date.parse(messageText)) {
    const birthDate = new Date(messageText);
    let daysLeft = daysUntilNext(birthDate.getMonth() + 1, birthDate.getDate());
    replyText = replies.tellDaysLeft(daysLeft);
  }
  // asking user's birthdate
  else if (
    (context.event.isPayload && context.event.payload === 'daysLeftYes') ||
    isPositiveSentiment(messageText)
  ) {
    replyText = replies.askBd;
  }
  // User refuses to know days left for next birthday
  else if (
    (context.event.isPayload && context.event.payload === 'daysLeftNo') ||
    !isPositiveSentiment(messageText)
  ) {
    replyText = replies.goodbye;
  }

  // send replyText
  if (Object.keys(options).length === 0) {
    context.sendText(replyText);
  } else {
    await context.sendText(replies.askDaysLeft(replyText), options);
  }

  previousText = replyText;

  // saving data
  await saveMessage(context);
};
