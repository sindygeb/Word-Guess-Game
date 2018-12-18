//reference DOM elements
var newGameBtn = document.getElementById('start-button');
var guessWord = document.getElementById('placeholder');
var wins = document.getElementById('win-total');
var lettersGuessed = document.getElementById('letters-guessed');
var attemptsLeft = document.getElementById('attempts-left');

//create array of words
var characters = [
    "link",
    "mario",
    "pikachu",
    "fox"
];

var wins = 0;
var guessesLeft = 8;
var pickedChar = '';
var pickedCharPlaceholder = [];
var guessedLetters = [];

if (newGameBtn){
newGameBtn.addEventListener('click', newGame);
}

function newGame() {
    guessesLeft = 8;
    guessedLetters = [];
    pickedChar = characters[Math.floor(Math.random() * characters.length)];
    for(var i = 0; i < pickedChar.length; i++) {
        if (pickedChar === ' ') {
            pickedCharPlaceholder.push(' ');
        } else {
            pickedCharPlaceholder.push('_');
        }
    }
    guessesLeft.textContent = guessesLeft;
    guessWord.textContent = pickedCharPlaceholder.join('');
    guessedLetters.textContent = lettersGuessed;
};