const natural = require('natural');
const { WordTokenizer, SentimentAnalyzer, PorterStemmer } = natural;
const stopword = require('stopword');
const aposToLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');

const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
const negativeSlangsMap = { nah: true, nope: true };
const positiveSlangsMap = { yup: true, sure: true };

exports.isPositiveSentiment = (str) => {
  if (positiveSlangsMap[str.toLowerCase()]) {
    return true;
  } else if (negativeSlangsMap[str.toLowerCase()]) {
    return false;
  }
  const lexed = aposToLexForm(str)
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, '');

  const tokenized = tokenizer.tokenize(lexed);
  const spellFixed = tokenized.map((word) => spellCorrector.correct(word));
  const stopWordsRemoved = stopword.removeStopwords(spellFixed);

  const sentimentCount = analyzer.getSentiment(stopWordsRemoved);
  // console.log(sentimentCount);
  if (sentimentCount >= 1) return true; // positive
  return false;
};
