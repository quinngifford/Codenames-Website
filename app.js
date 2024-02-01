const randomWords_ = new Array("voiceless","rich","plausible","release","possess","spell","frightening","inquisitive","shelter","perpetual","bike","tickle","throat","pot","help","deceive","tomatoes","futuristic","person","expert","spray","abject","swing","clap","sniff","join","inquisitive","wiggly","gentle","cheerful","writing","maniacal","flawless","orange","suspend","surprise","dick","sex","water","mouse","key","hitler","slave","slip","reaper","sword","lamp","phone", "castle", "galaxy", "rascal", "burrito", "aroma", "tiger");
const cards = document.getElementsByClassName("wordCard");
const genButton = document.getElementById("genButton");
const OJR = document.getElementById("opJoinRed")
const SJR = document.getElementById("spyJoinRed");
const OJB = document.getElementById("opJoinBlue");
const SJB = document.getElementById("spyJoinBlue");

var hintInput = document.querySelector('.hintInput');
var guessesInput = document.querySelector('.guessesInput');
var submitHint = document.querySelector('.submitButton');
var endTurnButton = document.querySelector('.endTurnButton');


let red = "#FF0000"; // Red color
let blue = "#0000FF"; // Blue color
let gray = "#808080"; // Gray color
let black = "#000000"; // Black color
let white = "#FFFFFF";


let guessNum = 0;
let maxGuesses = 0;
let pRole = 0;
let pTeam = 0;
let turn = 0;
let phase = 0;

function toggleInputsOn(){
    hintInput.disabled = false;
    guessesInput.disabled = false;
    submitHint.disabled = false;
    endTurnButton.disabled = false;
}
function toggleInputsOff(){
    hintInput.disabled = true;
    guessesInput.disabled = true;
    submitHint.disabled = true;
    endTurnButton.disabled = true;
}

toggleInputsOff();

function joinGame(team, role) {
    pRole = role;
    pTeam = team;
}

function joinGame(team, role) {
    pRole = role;
    pTeam = team;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}

const generateWords = () => {
    turn = 0;

    for (let i = 0; i < cards.length; ++i) {
        let randomWords = randomWords_.slice();
        let x = Math.floor(Math.random() * (randomWords.length-1));
        cards[i].value = randomWords[x].charAt(0).toUpperCase() + randomWords[x].slice(1);
        randomWords.splice(x, 1);
        cards[i].style.color = white;
    }

    let shuffCards = [...cards];
    shuffleArray(shuffCards);
    for (let i = 0; i < shuffCards.length; i++) {
        let button = shuffCards[i];
        let color;
        if (i < 9) {
            color = red;
        } else if (i >= 9 && i < 17) {
            color = blue;
        } else if (i >= 17 && i != 24) {
            color = gray;
        } else if (i == 24) {
            color = black;
        }
        button.setAttribute('data-color', color);
    }
    if (pRole == 1){
        revealAll();
    }
    console.log(pRole, turn, pTeam, phase);
    if(pRole == 1 && turn == pTeam){
        toggleInputsOn();
    }
    genButton.disabled = true;
}

for (let i = 0; i < cards.length; ++i) {
    cards[i].addEventListener("click", function() {
        revealCard(i);
      });
}

function clearNames() {
    document.getElementById('opNameRed').textContent = '';
    document.getElementById('spyNameRed').textContent = '';
    document.getElementById('opNameBlue').textContent = '';
    document.getElementById('spyNameBlue').textContent = '';
}

genButton.addEventListener('click', generateWords);
OJR.addEventListener("click", function() {
    clearNames();
    document.getElementById('opNameRed').textContent = 'Your Name';
    joinGame(0, 0);
});
SJR.addEventListener("click", function() {
    clearNames();
    document.getElementById('spyNameRed').textContent = 'Your Name';
    joinGame(0, 1);
});
OJB.addEventListener("click", function() {
    clearNames();
    document.getElementById('opNameBlue').textContent = 'Your Name';
    joinGame(1, 0);
});
SJB.addEventListener("click", function() {
    clearNames();
    document.getElementById('spyNameBlue').textContent = 'Your Name';
    joinGame(1, 1);
});

submitHint.addEventListener('click', function() {
    if(pRole == 1 && turn == pTeam && phase == 0){
        let hint = hintInput.value;
        let numGuess = guessesInput.value;
        showHint(hint, numGuess);
        phase = 1;
        if(pRole == 0 && turn == pTeam){
            endTurnButton.disabled = false;
        }
    } 
});
endTurnButton.addEventListener('click', function() {
    if(pRole == 0 && turn == pTeam && phase == 1){
        turn = (turn + 1) % 2;
        phase = 0;
        guessNum = 0;
        if(pRole == 1 && turn == pTeam){
            toggleInputsOn();
        }
        endTurnButton.disabled = true;
    }
    
});

function showHint(hint, numGuess){
    toggleInputsOff();
    phase = 1;
    hintInput.value = hint;
    guessesInput.value = numGuess;

}

function revealAll() {
    for (let i = 0; i < cards.length; ++i) {
        cards[i].style.color = cards[i].dataset.color;
    }
}
function revealCard(x) {
    if(pRole == 0 && turn == pTeam && phase == 1 && guessNum < maxGuesses){
        cards[x].style.color = cards[x].dataset.color;
        guessNum++;
    }
}