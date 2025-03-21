const wordList = [
    'jaydes',
    'xaviersobased',
    'osamason',
    'troll',
    'meme',
    'funny',
    'superdank',
];

let selectedWord = ''
let displayedWord = ''
let wrongGuess = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level){
    selectedWord = getRandomWord(level)



    //update difficulty display div
    updateDifficultyDisplay(level)

    // create placeholders for selected words 
    displayedWord = '_'.repeat(selectedWord.length)

    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')


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

function updateDifficultyDisplay(level){
    let difficultyBox = document.getElementById('difficultyBox')


    //remove previous difficulty classes
    difficultyBox.classList.remove('easy', 'medium', 'hard')
//add back appropriate class that was picked to click difficulty 
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`

}