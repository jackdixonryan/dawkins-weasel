const fs = require("fs");
const path = require("path");

function load(thePath) { 
  const file = fs.readFileSync(path.join(__dirname, thePath), 'utf-8');
  const string = file.toString();

  // it's all good.
  return string; 
}

function turnIntoOneWord(thePath) {
  const file = load(thePath);
  const asWord = file.split(" ").join("");
  const asOneLine = asWord.split("\n").join("");
  fs.writeFileSync("./oneword.txt", asOneLine);
}

turnIntoOneWord("bible.txt");