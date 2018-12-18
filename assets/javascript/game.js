//reference DOM elements
var $newGameBtn = document.getElementById('start-button');
var $placeholders = document.getElementById('placeholders');
var $wins = document.getElementById('wins');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');

//create array of words (characters)
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
    "princess zelda",
    "marth",
    "captain falcon",
    "bowser",
    "ness",
    "princess peach"
];

//create variables needed
var wins = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

//start a new game
function newGame() {
    //to start and stop game
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    //pick a new word randomly
    pickedWord = characters[Math.floor(Math.random() * characters.length)];

    //for loop to fill word with underscores or spaces
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

//when the user guesses a letter
function letterGuess(letter) {
    console.log(letter);

    //if the game is being played, and a letter is guessed, push the letter
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
      newGame();  
    }
}

function bigWinner() {
    if (win === 15) {
        alert("Whoa buddy - that's a lotta wins! Way to go!"); {    
        }
    }
}

function play(){
    var audio = document.getElementById("audio");
    audio.play();
}

$newGameBtn.addEventListener('click', newGame);

document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}