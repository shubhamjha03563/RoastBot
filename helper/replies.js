module.exports = replies = {
  askName: "Hi, what's your name?",
  askBd: "Whats's your birthdate? (YYYY-MM-DD)",
  askDaysLeft: (username) => {
    return `Hi ${username}, wanna know the total days left for your birthday?`;
  },
  tellDaysLeft: (daysLeft) => {
    return `You have ${daysLeft} days left for your next birthday. But you can give the party now also.`;
  },
  defaultText:
    "Don't mind me! Just testing that you're there, please continue the conversation.",
  goodbye: 'Alright, bye! Who cares anyways.',
};
