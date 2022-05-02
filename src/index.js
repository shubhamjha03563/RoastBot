const { daysUntilNext } = require('../helper/dateTime');
const { saveMessage, updateUser } = require('../helper/saveData.js');

module.exports = async function App(context) {
  let messageText = context.event.text;
  let replyText =
    "Don't mind me! Just testing that you're there, please continue the conversation."; // default text if anything goes wrong
  let replyWithText = true;

  // user starts the conversation
  if (
    (context.event.isPayload && context.event.payload === 'GET_STARTED') ||
    messageText === 'Hi' ||
    messageText === 'hi'
  ) {
    replyText = "Hi, what's your name?";
    // replyWithText = false;
  }
  // when user gives birthdate, then it's format is checked
  else if (context.event.isText && !!Date.parse(messageText)) {
    const birthDate = new Date(messageText);
    let daysLeft = daysUntilNext(birthDate.getMonth() + 1, birthDate.getDate());
    replyText = `You have ${daysLeft} days left for your next birthday. But you can give the party now also.`;
  }
  // asking user's birthdate
  else if (context.event.isPayload && context.event.payload === 'daysLeftYes') {
    replyText = `Whats's your birthdate? (YYYY-MM-DD)`;
  }
  // User refuses to know days left for next birthday
  else if (context.event.isPayload && context.event.payload === 'daysLeftNo') {
    replyText = 'Alright, bye! Who cares anyways.';
  }
  // User provides his/ her name
  else {
    await context.sendText(
      `Hi ${messageText}, wanna know the total days left for your birthday?`,
      {
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
      }
    );
    replyWithText = false;
    await updateUser(context);
  }

  // send replyText
  if (replyWithText == true) {
    context.sendText(replyText);
  }

  // saving data
  await saveMessage(context);
};
