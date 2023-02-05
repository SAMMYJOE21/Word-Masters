const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;
let used = [];
let k = 0;
let wordParts = [];
let word = "";
let right =[];
let z = 0;

let currentGuess = "";
let currentRow = 0;

let isLoading = true;

async function init() {
    // const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const res = await fetch("https://words.dev-apis.com/word-of-the-day?random=1");
    const resObj = await res.json();
    // const { word } = await res.json() this means that we know what we are getting from res.json() has a...
    //property called word pull it out and call it word
    word = resObj.word.toUpperCase();
    wordParts = word.split("");
    let done = false;
    setLoading(false);
    isLoading = false;

    console.log(word);

    document.addEventListener('keydown', function handleKeyPress (event) {
        if (done || isLoading) {
            //do nothing
            return;
        }

        const action = event.key;
        performAction(action);
        
    });

}


function performAction(action) {
    if (action === "Enter") {
        commit();
    } else if (action === "Backspace") {
        backspace();
    } else if (isLetter(action))  {
        addLetter(action.toUpperCase());
    }
}


function addLetter (letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
        // add letter to the end
        currentGuess += letter;
       
    } else {
        // replace last letter
        currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
}

async function commit() {
    if (currentGuess.length != ANSWER_LENGTH) {
        markInvalid();
        return;
    }

    //validate the word
    isLoading = true;
    setLoading(true);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
        method: "POST",
        body: JSON.stringify({ word: currentGuess })
    });
        
    const resObj = await res.json();
    const validWord = resObj.validWord;
    //const { validWord } = resObj; (same as the two lines above)

    isLoading = false;
    setLoading(false);

    if (!validWord) {
        markInvalid();
        return;
    }
    
    for (let i = 0; i<k; i++) {
        if (currentGuess === used[i]) {
            alert('This word has already been used. Please type another word!');
            return;
        }
    }
    used[k] = currentGuess;
    k++;


    const guessParts = currentGuess.split("");
    //this split function will turn the current guess into an array of letter
    const map = makeMap(wordParts);

    for (let i = 0; i < ANSWER_LENGTH; i++) {
        let change = document.getElementById(guessParts[i]);
        //mark as correct
        if (guessParts[i] === wordParts[i]) {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
            map[guessParts[i]]--;
            change.style.background = 'darkgreen';
            change.style.color = 'white';
        } 
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
        let change = document.getElementById(guessParts[i]);
        if (guessParts[i] === wordParts[i]) {
            right[z] === guessParts[i];
            z++;
        } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
            map[guessParts[i]]--;
            for (let j = 0; j < right.length; j++) {
                if (guessParts[i] != right[j]) {
                    change.style.background = 'goldenrod';
                    change.style.color = 'white';
                } 
            } 
        } else {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
            change.style.background = '#888';
            change.style.color = 'white';

        }
    }

    currentRow++;
    
    if (currentGuess === word) {
        //win
        // alert("YOU WIN!");
        // document.querySelector(".brand").classList.add("winner");
        // alert('Congratulation! You have completed Word Master')
        done = true;
        return;
    } else if (currentRow === ROUNDS) {
        //lose
        alert(`you lose! The word was ${word}`);
        done = true;
    }
    currentGuess = "";
}


function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
}


function markInvalid() {
    // alert('Not a valid word');

    for (let i = 0; i < ANSWER_LENGTH; i++) {
        letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

        setTimeout(function () {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
        }, 10);
    }
}

function markIncomplete() {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        letters[currentRow * ANSWER_LENGTH + i].classList.remove("animate__shakeX");

        setTimeout(function () {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("animate__shakeX");
        }, 10);
    }
}

function isLetter(letter) {    
    return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
    loadingDiv.classList.toggle("hidden", !isLoading);
}


function makeMap (array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        if (obj[letter]) {
            obj[letter]++;
        } else {
            obj[letter] = 1;
        }
    }
    return obj;
}


init()

