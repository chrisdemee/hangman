const wordList = [
  'jaydes',
  'xaviersobased',
  'osamason',
  'troll',
  'che',
  'autumn',
  'jpegmafia',
  'lucki',
  'willfrmthed',
  'ian',
];
//decare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6
const healthImages = [
  'https://d.newsweek.com/en/full/2504545/lil-durk.jpg?w=1600&h=900&q=88&f=b824f93e4c985269f3c597d0e9d234cd', // 6th wrong guess 
  'https://i.ytimg.com/vi/974TXFKtyls/maxresdefault.jpg', // 5th wrong guess
  'https://cdn.shopify.com/s/files/1/0069/3465/9162/files/jaydes-hero-banner-241101-1344.webp', // 4th wrong guess
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsmTs1i5ZwK8WETIJf7q7IAwGSBMiA1tVzbQ&s', // 3rd wrong guess
  'https://ih1.redbubble.net/image.5588313530.2371/raf,360x360,075,t,fafafa:ca443f4786.jpg', // 2nd wrong guess
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmQu3xMg6CLkqYm2hA2o6X58G3GYaHs26wEw&s', // 1st wrong guess
  'data:image/jpeg;base64,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'  // 0 wrong guesses 
];



// Start Game Function (runs everything)
function startGame(level) {
  //reset game
  wrongGuesses = 0
  guessedLetters = []

  selectedWord = getRandomWord(level)
  displayedWord = '_'.repeat(selectedWord.length)

  updateDifficultyDisplay(level)
  updateUI()

  //event listener to trigger guessLetter() when Enter is pressed
  // Ensure no duplicate event listeners
  document.getElementById('letterInput').removeEventListener('keypress', guessLetter);

  // Add event listener to trigger guessLetter() when Enter is pressed
  document.getElementById('letterInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      guessLetter();
    }
  });
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      guessLetter();
    }
  }

  //Show Game Area/Difficulty Display , hide selection buttons
  document.getElementById('gameArea').classList.remove('d-none')
  document.getElementById('gameArea').classList.add('d-block')

  document.getElementById('difficultyBox').classList.remove('d-none')
  document.getElementById('difficultyBox').classList.add('d-block')

  document.getElementById('difficultySelection').classList.add('d-none')
  //Auto-focus on input
  document.getElementById('letterInput').focus()
}

function getRandomWord(level) {
  let filteredWords = wordList.filter(word => {
    if (level === 'easy') return word.length <= 4
    if (level === 'medium') return word.length >= 5 && word.length <= 7
    if (level === 'hard') return word.length >= 8
  })
  return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//update Difficulty Display
function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById('difficultyBox')
  difficultyBox.classList.remove('easy', 'medium', 'hard')

  if (level === 'easy') {
    difficultyBox.textContent = 'Difficulty: Easy'
    difficultyBox.classList.add('easy')
  } else if (level === 'medium') {
    difficultyBox.textContent = 'Difficulty: Medium'
    difficultyBox.classList.add('medium')
  } else if (level === 'hard') {
    difficultyBox.textContent = 'Difficulty: Hard'
    difficultyBox.classList.add('hard')
  }
}

function updateUI() {
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ') // shows word progress with spaces
}

function guessLetter() {
  let inputField = document.getElementById('letterInput') // Get input field
  let guessedLetter = inputField.value.toLowerCase() // Convert input to lowercase

  //Check if input is a valid letter (A-Z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert('Please enter a valid letter (A-Z)!') // alerts user if invalid input
    inputField.value = '' // Clear input field
    return // leaves function
  }


  //Check if letter was already guessed
  if (guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
    inputField.value = '' // Clear input field
    return
  }

  //Store guessed letter
  guessedLetters.push(guessedLetter)

  //Check if guessed letter is in the selected word
  if (selectedWord.includes(guessedLetter)) {
    updateCorrectGuess(guessedLetter)
  } else {
    updateWrongGuess(guessedLetter)
  }

  inputField.value = '' // clears input field
  document.getElementById('letterInput').focus() // focuses on input field for next guess

}

function updateWrongGuess(guessedLetter) {
  wrongGuesses++
  document.getElementById('wrongLetters').textContent += `${guessedLetter}`
  //document.getElementById('shamrock').src = `imgs/shamrock${6-wrongGuesses}.jpg`
  let healthIndex = Math.max(0, maxMistakes - wrongGuesses); // prevents index from going negative
  document.getElementById('Shamrock').src = healthImages[healthIndex];
  if (wrongGuesses === maxMistakes) {
    endGame(false)
  }
    // play wrong guess sound 
    document.getElementById('wrongGuess').play();
}

function updateCorrectGuess(guessedLetter) {
  let newDisplayedWord = ''

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter // Replace underscore with correct letter
    } else {
      newDisplayedWord += displayedWord[i] // Keep existing correct letters
    }
  }

  displayedWord = newDisplayedWord
  updateUI()

  //  Check if the player has guessed all letters
  if (!displayedWord.includes('_')) {
    endGame(true)
  }

}

function endGame(won) {
  let message = won
    ? 'Congratulations! You guessed the word!'
    : `Game Over! The word was "${selectedWord}".`

  setTimeout(() => alert(message), 100) // Display alert after short delay

}

// sound effects
const correctSound = new Audio('sounds/swamp.mp3');
const wrongSound = new Audio('sounds/pegtag.mp3');

function updateCorrectGuess(guessedLetter) {
  let newDisplayedWord = '';

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter; // Replace underscore with correct letter
    } else {
      newDisplayedWord += displayedWord[i]; // Keep existing correct letters
    }
  }

  displayedWord = newDisplayedWord;
  updateUI();

  // Play correct guess sound
  document.getElementById('correctGuess').play();
  // Check if the player has guessed all letters
  if (!displayedWord.includes('_')) {
    endGame(true);
  }
}

// Declare score variables (they persist until page reload)
let wins = 0;
let losses = 0;

// Update score display
function updateScoreDisplay() {
  document.getElementById('winCount').textContent = `Wins: ${wins}`;
  document.getElementById('lossCount').textContent = `Losses: ${losses}`;
}

// Called when the game ends
function endGame(won) {
  let messageBox = document.getElementById('endGameMessage'); // gets message box
  let messageText = document.getElementById('messageText'); // gets text area inside message box

  if (won) {
    messageText.textContent = 'Congratulations! You guessed the word!';
    messageBox.classList.add('win'); // adds class for styling winning message
    wins++;
  } else {
    messageText.textContent = `Game Over! The word was "${selectedWord}".`;
    messageBox.classList.add('lose'); // adds class for styling losing message
    losses++;
  }

  messageBox.classList.remove('d-none'); // makes message box visible
  updateScoreDisplay();
}

// / rebuilt restart Game reloads the page to reset everything
function restartGame() {

  document.getElementById('endGameMessage').classList.add('d-none'); // hide message box, d-none to hide it
  document.getElementById('endGameMessage').classList.remove('win', 'lose'); // remove styling

  wrongGuesses = 0;
  guessedLetters = [];

  // hide the game area and show difficulty selection
  document.getElementById('difficultySelection').classList.remove('d-none');
  document.getElementById('gameArea').classList.add('d-none');
  document.getElementById('difficultyBox').classList.add('d-none');

  // reset word display to default
  document.getElementById('wordDisplay').textContent = '_ _ _ _ _';

  // get rid of wrong guesses 
  document.getElementById('wrongLetters').textContent = 'Wrong guesses: ';

  // resets shamrock image to full health
  document.getElementById('Shamrock').src = healthImages[6];
  // gets rid of the letter input field
  document.getElementById('letterInput').value = '';



  updateScoreDisplay();
}

// load up the score when the game starts
window.onload = function () {
  updateScoreDisplay();
};
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    guessLetter();
  }
}