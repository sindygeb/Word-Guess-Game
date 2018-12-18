//reference DOM elements
var $newGameBtn = document.getElementById('start-button');
var $placeholders = document.getElementById('placeholders');
var $wins = document.getElementById('wins');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var mySound = new Mysound("completion.wav");

//create array of words
var characters = [
    "link",
    "mario",
    "pikachu",
    "fox", 
    "samus", 
    "yoshi", 
    "donkey kong",
    "kirby",
    "luigi",
    "jigglypuff",
    "zelda",
    "marth",
    "captain falcon",
    "bowser"
];
var wins = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

function newGame() {
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    //pick a new word
    pickedWord = characters[Math.floor(Math.random() * characters.length)];

    for(var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }

    //Write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = incorrectLetterBank;
}

function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        guessedLetterBank.push(letter);

        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);
    } 
    else {
        if (!gameRunning) {
            alert("The game isn't running, click on 'Let's A Go' button to start over.");
        } else {
            alert("You already guessed this letter, try a new one!");
        }
    }
}

function checkIncorrect(letter) {
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && 
    pickedWordPlaceholderArr.indexOf(letter.toUpperCase())=== -1) {
        guessesLeft--;
        incorrectLetterBank.push(letter);
        $guessedLetters.textContent = incorrectLetterBank.join(' ');
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

//lose condition
function checkLoss() {
   if (guessesLeft === 0) {
       gameRunning = false;
       alert('Sorry, you lose!' + ' Score: ' + wins); {
       }
   }
   checkWin();
}

//win condition
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase()) {
      wins++;
      $wins.textContent = wins;
      mySound.play();
      newGame();  
    }
}
function bigWinner() {
    if (win === 15) {
        alert("Whoa buddy - that's a lotta wins! Way to go!"); {    
        }
    }
}



$newGameBtn.addEventListener('click', newGame);

document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}