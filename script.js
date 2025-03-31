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

let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level){
    wrongGuesses = 0
    guessedLetters = []
    selectedWord = getRandomWord(level)
    // create placeholders for selected words 
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

function getRandomWord(level){
   let filteredWords = wordList.filter(word => {
    if (level === 'easy') return word.length <= 4
    if (level === 'medium') return word.length >= 5 && word.length <= 7
    if (level === 'hard') return word.length >= 8
   })

   return filteredWords [ Math.floor(Math.random() * filteredWords.length)]
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

    //check if the input is a valid letter (a-z)
    if (!guessedLetter.match(/^[a-z]$/)){
        alert('Please enter a valid letter (A-Z)!') // Alert user if invalid input
        inputField.value = '' // Clear input field
        return // Exit function

    }
    //if statement checking iof the letter was alr guessed 
    if(guessedLetters.includes(guessedLetter)){
        alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
        inputField.value = '' //clears input field
        return
    } else {
        guessedLetters.push(guessedLetter)
    }

//check if guessed letter is in selected word
    if(selectedWord.includes(guessedletters)){
        updateCorrectGuess(guessedLetter)
    } else {
        updateWrongGuess(guessedLetter)
    }

    inputField.value = ''
    inputField.focus()
}

function wrongGuess(guessedLetter) {
    //increment # of wrong guesses
    //add guess letter to guessedLetter array
    //check to see if # of wrong guesses is === to MaxMistakes if it is, call endgame(false)
    wrongGuess
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`

    document.getElementById('shamrock').src = `imgs/shamrock${6 - wrongGuess}.jpg`
    if (wrongGuess === maxMistakes){
        endGame(false)
    }
}

function correctGuess(guessedLetter){
    let newDisplayedWord = ''

    for (let i = 0; i < selectedWord.length; i++){
        if(selectedWord[i] === guessedLetter){
            newDisplayedWord += guessedLetter

        }else {
            newDisplayedWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayedWord
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

    if(displayedWord.includes('_')){
        endGame(true)
    }
}


function endGame(won){
    if (won === true){
        setTimeout(() => alert(message), 100)
    }

}

function restartGame(){
    location.reload()
  }