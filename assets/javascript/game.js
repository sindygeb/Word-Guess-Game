//List of possible words as a variable

var characters = [
    "link",
    "mario",
    "pikachu",
];

var startBtn = document.querySelector("#startBtn");
var wordField = document.querySelector("#guessWord");
var attemptsLeft = document.querySelector("#attemptsLeft");
var wrongLetters = document.querySelector("lettersGuessed");
var winsCount = document.querySelector("#winTotal");
var wins = 0;

startBtn.onclick = function() {
    gameStart();
};

function gameStart() {
    var score = 0;
    var chances = 10;
    var rightGuess = [];
    var wrongGuess = [];
    
    attemptsLeft.innerHTML = chances + " attempts left";
    winsCount.innerHTML = "Wins: " + wins;
    wrongLetters.innerHTML = "Wrong Guesses: " + wrongGuess;
    
    var character = characters[Math.floor(Math.random() * characters.length)];
    var letterArr = character.split('');
    
    guessWord.innerHTML = "<div class ='wordWrap'></div>";
    
    var wordWrap = document.querySelector(".wordWrap");

    for (var i = 0; i < character.length; i++) {
        var mask = document.createElement("span");
        mask.className = "mask";
        mask.id = "id" +i;
        wordWrap.appendChild(mask);
    }

    document.onkeyup = function(event) {
        
        var keyInput = event.key.toUpperCase();
        var letterIndex = letterArr.indexOf(keyInput);
        var keyInputCode = keyInput.charCodeAt(0);

        if (keyInput.length == 1 && (keyInputCode >= 65 && keyInputCode <= 99)) {
            if (letterIndex !== -1) {
                if (rightGuess.indexOf(keyInput) === -1) {
                    rightGuess.push(keyInput);
                    for (var i = 0; i < character.length; i++) {
                        if (keyInput === character.charAt(i)) {
                            var unMask = document.getElementById("id" + i);
                            unMask.className = "unMask";
                            unMask.innerHTML = keyInput;
                            score++;
                        }
                        if (score === character.length) {
                            wrongGuess.length = 0;
                            wrongLetters.innerHTML = "";
                            var playAgainBtn = "<div class='btnWrap'><button id='playAgain' class='btn'>PLAY AGAIN</button></div>";
                            wordWrap.innerHTML = "<p> YOU WIN! CONGRATULATIONS!</p></br>" + playAgainBtn;
                            wrongLetters.innerHTML = "Wrong Guesses: ";
                            var playAgain = document.querySelector("#playAgain");
                            playAgain.onclick = function(){
                                wins++;
                                gameStart();
                            };
                        }
                    }
                }
            } else {
                if(chances > 0 && wrongGuess.indexOf(keyInput) === -1) {
                    wrongGuess.push(keyInput);
                    chances--;
                    attemptsLeft.innerHTML = chances + "attempts left";
                    wrongLetters.innerHTML = "Wrong Guesses: " + wrongGuess;
                }

                if(chances == 0) {
                    wordWrap.innerHTML = "<p>YOU LOSE!</p></br>" + playAgainBtn;
                    wrongGuess.length = 0;
                    wrongLetters.innerHTML = "Wrong Guesses: ";
                    document.onkeyup = function(event){
                        console.log("you lost");
                    };
                }
            }
        }

    };

};