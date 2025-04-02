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
];
//decare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

// Start Game Function (runs everything)
function startGame (level) {
  //reset game
  wrongGuesses = 0
  guessedLetters = []

  selectedWord = getRandomWord(level)
  displayedWord = '_'.repeat(selectedWord.length)

  updateDifficultyDisplay(level)
  updateUI()

  //event listener to trigger guessLetter() when Enter is pressed
document.getElementById('letterInput').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
      guessLetter();
  }
});
  
  //Show Game Area/Difficulty Display , hide selection buttons
  document.getElementById('gameArea').classList.remove('d-none')
  document.getElementById('gameArea').classList.add('d-block')

  document.getElementById('difficultyBox').classList.remove('d-none')
  document.getElementById('difficultyBox').classList.add('d-block')

  document.getElementById('difficultySelection').classList.add('d-none')
  //Auto-focus on input
  document.getElementById('letterInput').focus()
}

function getRandomWord (level) {
  let filteredWords = wordList.filter(word => {
    if (level === 'easy') return word.length <= 4
    if (level === 'medium') return word.length >= 5 && word.length <= 7
    if (level === 'hard') return word.length >= 8
  })
  return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//update Difficulty Display
function updateDifficultyDisplay (level) {
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
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ') // Show word progress with spaces
}

function guessLetter () {
  let inputField = document.getElementById('letterInput') // Get input field
  let guessedLetter = inputField.value.toLowerCase() // Convert input to lowercase

  //Check if input is a valid letter (A-Z)
  if (!guessedLetter.match(/^[a-z]$/)){
    alert('Please enter a valid letter (A-Z)!') // Alert user if invalid input
    inputField.value = '' // Clear input field
    return // Exit function
  }
  

  //Check if letter was already guessed
  if(guessedLetters.includes(guessedLetter)){
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
    inputField.value = '' // Clear input field
    return
  }

  //Store guessed letter
  guessedLetters.push(guessedLetter)

  //Check if guessed letter is in the selected word
  if (selectedWord.includes(guessedLetter)){
    updateCorrectGuess(guessedLetter)
  } else {
    updateWrongGuess(guessedLetter)
  }

  inputField.value = '' // Clear input field
  document.getElementById('letterInput').focus() // Refocus input field for next guess

}

function updateWrongGuess(guessedLetter){ 
  wrongGuesses++
  document.getElementById('wrongLetters').textContent += `${guessedLetter}`
  //document.getElementById('shamrock').src = `imgs/shamrock${6-wrongGuesses}.jpg`

  if (wrongGuesses === maxMistakes){
    endGame(false)
  }
}

function updateCorrectGuess(guessedLetter){
  let newDisplayedWord =''

  for (let i=0; i < selectedWord.length; i++){
    if (selectedWord[i] === guessedLetter){
      newDisplayedWord += guessedLetter // Replace underscore with correct letter
    }else{
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

function endGame(won){
  let message = won
  ? 'Congratulations! You guessed the word!'
  : `Game Over! The word was "${selectedWord}".`

setTimeout(() => alert(message), 100) // Display alert after short delay

}

// sound effects
const correctSound = new Audio('sounds/swamp.mp3'); 
const wrongSound = new Audio('sounds/wrong.mp3'); 

function updateWrongGuess(guessedLetter) { 
    wrongGuesses++;
    document.getElementById('wrongLetters').textContent += `${guessedLetter} `;

   
    wrongSound.play();

    if (wrongGuesses === maxMistakes) {
        endGame(false);
    }
}

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
    let message = won
        ? 'Congratulations! You guessed the word!'
        : `Game Over! The word was "${selectedWord}".`;

    setTimeout(() => alert(message), 100);

    // Update score
    if (won) {
        wins++;
    } else {
        losses++;
    }

    updateScoreDisplay(); // Refresh score display
}

// /Restart Game - Reloads the page to reset everything
function restartGame(){
 

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
   document.getElementById('Shamrock').src = 'imgs/shamrock6.jpg'; 

   // gets rid of the letter input field
   document.getElementById('letterInput').value = '';

   updateScoreDisplay();
}

// Load the score when the game starts
window.onload = function () {
  updateScoreDisplay();
};