/**
 * Set global variable
 **/

// The unordered list where the player's guessed letters will appear.
const ul = document.querySelector(".guessed-letters");
// The button with the text "Guess!" in it.
const btnGuess = document.querySelector(".guess");
// The text input where the player will guess a letter.
const userInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const paraProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const paraRemaining = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const span = document.querySelector("span");
// The empty paragraph where messages will appear when the player guesses a letter.
const paraMessage = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const btnPlayAgain = document.querySelector(".play-again");
// Variable with value magnolia by default
const word = "magnolia";
// Create another global variable with an empty array
const guessedLetters = [];

const paraUpdate = word => {
    const arr = [];
    for (item of word) {
        arr.push("●");
    }
    // console.log(arr);
    paraProgress.innerText = arr.join("");
}
paraUpdate(word);

btnGuess.addEventListener("click", event => {
    event.preventDefault();
    const getValue = userInput.value.toUpperCase();
    if(validateInput(getValue)) {
        makeGuess(getValue);
    }
    userInput.value = "";
});

const validateInput = getValue => {
    const accepterLetter = /[a-zA-Z]/;
    const matchLetter = getValue.match(accepterLetter);
    if (getValue.length <= 0) {
        paraMessage.innerText = "Please enter the guess word!";
    } else if (getValue.length > 1) {
        paraMessage.innerText = "Character should be only 1!";
    } else if (getValue != matchLetter) {
        paraMessage.innerText = "Plase enter alphabetical only! Example: A-Z";
    } else {
        return userInput;
    }
}

const makeGuess = getValue => {
    // make input to uppercase
   // getValue.toUpperCase();
    if (guessedLetters.includes(getValue)) {
        paraMessage.innerText = "You've already guess that letter, try another letter!";
    } else {
        guessedLetters.push(getValue);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgess(guessedLetters);
    }
}

const showGuessedLetters = () => {
    ul.innerHTML = "";
    for(guessLetterItem of guessedLetters) {
        const el = document.createElement("li");
        el.innerText = guessLetterItem.toUpperCase();
        ul.append(el);
    }
}

const updateWordInProgess = guessedLetters => {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    // check if the wordArray contains any  letters from guessedLetters array
    const updateWord = [];
    for(const alphabet of wordArray) {
        if(guessedLetters.includes(alphabet)) {
            updateWord.push(alphabet.toUpperCase());
        } else {
            updateWord.push("●");
        }
    }
    // check updateWord
    // console.log(updateWord);
    paraProgress.innerText = updateWord.join("");
    checkWin();
}

const checkWin = () => {
    // begin verifying if their word matches in progress matches
    if(paraProgress.innerText === word.toUpperCase()) {
        paraMessage.classList.add("win");
        paraMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>.`;
    }
}