const wordList = [
    ''
]

let selectedWord = ''
let displayedWord = ''
let wrongGuess = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level){
    selectedWord = getRandomWord(level)


    //Hide difficulty selection and show game area and difficulty box
     document.getElementById('difficultySelection').classList.add('d-none')
     

     document.getElementById('gameArea').classList.remove('d-none')
     document.getElementById('difficultyBox').classList.remove('d-none')

     document.getElementById('gameArea').classList.add("d-block")
     document.getElementById('difficultyBox').classList.add("d-block")

     
    
}

function getRandomWord(level){
   let filteredWords = wordList.filter(word => {
    if (level === 'easy') return word.length <= 4
    if (level === 'medium') return word.length >= 5 && word.length <= 7
    if (level === 'hard') return word.length >= 8
   })

   return filteredWords [ Math.floor(Math.random() * filteredWords.length)]
}