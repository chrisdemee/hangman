const wordList = [
  'jaydes',
  'xaviersobased',
  'osamason',
  'troll',
  'meme',
  'drank',
  'funny',
  'superdank',
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


  //update difficulty display div
  updateDifficultyDisplay(level)
  updateUI()

  


  document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')


  //Hide difficulty selection and show game area and difficulty box
   document.getElementById('difficultySelection').classList.add('d-none')
   

   document.getElementById('gameArea').classList.remove('d-none')
   document.getElementById('difficultyBox').classList.remove('d-none')

   document.getElementById('gameArea').classList.add("d-block")
   document.getElementById('difficultyBox').classList.add("d-block")
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

function updateDifficultyDisplay(level){
  let difficultyBox = document.getElementById('difficultyBox')


  //remove previous difficulty classes
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
//add back appropriate class that was picked to click difficulty 
  difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`



function guessLetter(){
  let inputField = document.getElementById('letterInput') //Get input field 
  let guessedLetter = inputField.value.toLowerCase() // Converts the input to lowercase

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
: `The game's over, The word was "${selectedWord}".`

setTimeout(() => alert(message), 100) // Display alert after short delay

}

// /Restart Game - Reloads the page to reset everything
function restartGame(){
location.reload()
}