const input = document.querySelector('input');
const output = document.querySelector('output');
const span = document.querySelector('span');
const words = [
  "programming",
  "javascript",
  "database",
  "markup",
  "framework",
  "variable",
  "stylesheet",
  "library",
  "asynchronous",
  "hypertext"
];

let randomizedWord = '';
let maskedWord = '';
let guessCount = 0;

const newGame = () => {
  guessCount = 0;
  const random = Math.floor(Math.random() * 10);
  randomizedWord = words[random];
  maskedWord = "*".repeat(randomizedWord.length);
  console.log(randomizedWord);
  output.innerHTML = maskedWord;
  updateGuessCount();
};

const win = () => {
  alert(`You have guessed right, the word is ${randomizedWord}. It took you ${guessCount} guesses.`);
  newGame();
};

const replaceFoundChars = (guess) => {
  guessCount++;
  for (let i = 0; i < randomizedWord.length; i++) {
    const char = randomizedWord.substring(i, i + 1);
    if (char === guess) {
      let newString = maskedWord.split('');
      newString.splice(i, 1, guess);
      maskedWord = newString.join('');
    }
  }
  output.innerHTML = maskedWord;
  updateGuessCount();
};

const updateGuessCount = () => {
  span.textContent = `Number of guesses: ${guessCount}`;
};

document.addEventListener('DOMContentLoaded', () => {
  newGame();

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const guess = input.value.trim().toLowerCase();
      if (guess === randomizedWord.toLowerCase()) {
        win();
      } else if (guess.length === 1) {
        replaceFoundChars(guess);
        if (maskedWord === randomizedWord) {
          win();
        }
      } else {
        alert("You guessed wrong!");
      }
      input.value = '';
    }
  });
});