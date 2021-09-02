
// many of these are specific to the web archive's version of Hamlet...
const theCharacters = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(""),
  ...'1234567890'.split(""),
  ...'abcdefghijklmnopqrstuvwxyz'.split(""),
  ...'!@#$%^&*()_+-=][{}|:;?/>.<,~`'.split(""),
  "'",
  '"',
  "\\",
  "/",
  ' ',
  '\n',
  '’',
  '—',
  '‘',
  'æ',
  '\t',
  '“',
  '”',
  'Æ',
  'Œ',
  'ë',
  '™',
  '•',

];

// I do not recommend running this method; the probability that it works in any length of time is monumentally small
function random(string, count) { 
  let guess = "";
  for (let i = 0; i < string.length; i++) {
    guess += theCharacters[Math.floor(Math.random() * theCharacters.length)];
  }
  count++;
  if (guess === string) {
    return count;
  } else {
    setTimeout(() => {
      if (count % 100 === 0) console.log(count);
      return random(string, count);
    }, 0.0001 * count);
  }
}

function dawkinsWeasel(string, count=0, setChars=null) {
  // for first execution
  if (!setChars) {
    setChars = new Array(string.length);
  }
  const chars = string.split("");
  for (let i = 0; i < chars.length; i++) {
    if (!setChars[i]) {
      const guess = theCharacters[Math.floor(Math.random() * theCharacters.length)];
      if (guess === chars[i]) {
        // we got the right letter.
        setChars[i] = guess;
      }
    }
  }

  count++;

  if (setChars.join("") === string) {
    return { value: setChars.join(""), count };
  } else {
    return dawkinsWeasel(string, count, setChars);
  }
}

// console.log(random("pie", 0));
// console.log(dawkinsWeasel("methinks it looks like a weasel"));

const fs = require("fs");
const path = require("path");

function load(thePath) { 
  const file = fs.readFileSync(path.join(__dirname, thePath), 'utf-8');
  const string = file.toString();
  for (let i = 0; i < string.length; i++) {
    if (!theCharacters.includes(string[i])) {
      console.log({ character: string[i] });
      throw new Error("Found an unknown character:");
    }
  }
  // it's all good.
  return string; 
}

function wc(thePath) { 
  const file = fs.readFileSync(path.join(__dirname, thePath), 'utf-8');
  const string = file.toString();
  const wds = string.split(" ");
  // imprecise but fuck it 
  return wds.length;
}

// console.log(wc(''));
// const bible = load('./bible.txt');
console.log(dawkinsWeasel('methinks it looks like a weasel'));
console.log(random("methinks it looks like a weasel", 0));