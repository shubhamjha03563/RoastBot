function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = replies = {
  askName: "hi, what's your name?",
  askBd: "whats's ur birthdate or when's ur next birthday? (YYYY-MM-DD)",
  askDaysLeft: (username) => {
    return `hi ${username}, wanna know the total days left for your birthday?`;
  },
  tellDaysLeft: (daysLeft) => {
    return `you have ${daysLeft} days left for your next birthday. But you can give the party now also.`;
  },
  defaultText:
    "don't mind me! Just checking that you're there, please continue the conversation.",
  goodbyeRude: 'aight, bye! who cares anyways.',
  goodByePolite: 'aight, bye! see ya.',
  wrongDate: () => {
    let arr = [
      'really! like common, how am I supposed to know your birthday with that.',
      "you're joking with me right!",
      "u think I'm dumb.",
    ];
    return arr[getRandomInt(arr.length)];
  },
  wrongInput:
    'bingo! wrong input GENIUS. \nhow about reading the messaging instructions once - https://github.com/shubhamjha03563/RoastBot#messaging ',
};
