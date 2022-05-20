import { words } from "./syllabeValues.js";

// Tracking variables
var check = false;
var successes = 0;
var fails = 0;
var successPercent = 0;
var counter = 1; // to avoid dividing by 0

// Maximum number of questions
let maxQuestions = 10;

// Set up tracking variables-DOM id selection
let counterID = document.getElementById('counter');
let successesID = document.getElementById('successes');
let failsID = document.getElementById('fails');
let successPercentID = document.getElementById('success-percent');

// Get question and input (user answer) DOM id
let question = document.getElementById('question');
let input = document.getElementById('input');

// Question index in words DB:
let index = 0;

// Algorithm functions:
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
    //The maximum is inclusive and the minimum is inclusive
}

function getRandomQuestion() {
    index = getRandomIntInclusive(0, words.length-1);
    question.innerText = words[index].jap;
    console.log('Expected: '+ words[index].jap);
    console.log('Actual: ' + question.innerText);
}

function getAnswer() {
    var submit = document.getElementById('submit');

    submit.addEventListener('click', () => {
        // Check if the input answer is correct
        if (input.innerText === words[index].romaji) {
            check = true;
        }
        else {
            check = false;
        }

        // Update tracking variables and counter
        checkAnswer();
        counter++;

        // Then update screen variables
        updateScreenVariables();

        // And determine if looping is needed:
        if (counter <= maxQuestions) {
            // Reset the question and input field
            getRandomQuestion()
            input.innerText = '';
        }
        else {
            // When finished, go back to main menu
            window.location.href = '../pages/index.html';
        }
    });
}

function updateScreenVariables() {
    // Update variables on screen
    counterID.innerText = counter.toString();
    successesID.innerText = successes.toString();
    failsID.innerText = fails.toString();
    successPercentID.innerText = successPercent.toFixed(2).toString();    
}

function checkAnswer() {
    if (check) {
        successes += 1;
        successPercent = (successes / counter)*100;
    }
    else {
        fails += 1;
    }
}

function initPractice() {
    // Set quesion once first
    getRandomQuestion();

    // Set on screen tracking variables once first
    updateScreenVariables()
    
    // Set event listener for answer submit button
    getAnswer();

    // Then give control to answer event listener...
}

initPractice()