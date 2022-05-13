// Syllabe image sources. These serve to present both the question and the
// possible answers
import { hiraganaValues, katakanaValues } from "./syllabeValues.js";

var check = false;
var successes = 0;
var fails = 0;
var successPercent = 0;
var counter = 0;
var temp_counter = 0;

// Set up tracking variables-DOM id selection
let counterID = document.getElementById('counter');
let successesID = document.getElementById('successes');
let failsID = document.getElementById('fails');
let successPercentID = document.getElementById('success-percent');

// Set up algorithm steps as functions (some of them)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
    //The maximum is inclusive and the minimum is inclusive
  }  

function getRandomQuestion(q, a) {
    let index = getRandomIntInclusive(1, hiraganaValues.length-1);
    let questionImg = document.getElementById('question');

    // Show the question
    if (q === 'hiragana' && a === 'romaji') {
        questionImg.src = `${hiraganaValues[index].kana}`;
    }
    else if (q === 'romaji' && a === 'hiragana') {
        questionImg.src = `${hiraganaValues[index].romaji}`;
    }
    else if (q === 'katakana' && a === 'romaji') {
        questionImg.src = `${katakanaValues[index].kana}`;
    }
    else if (q === 'romaji' && a === 'romaji') {
        questionImg.src = `${katakanaValues[index].romaji}`;
    }
    console.log('getRandomQuestion');
}

function getRandomAnswers(q, a) {
    let ansImg1 = document.getElementById('img1');
    let ansImg2 = document.getElementById('img2');
    let ansImg3 = document.getElementById('img3');
    let ansImg4 = document.getElementById('img4');

    if (q === 'hiragana' && a === 'romaji') {
        ansImg1.src = `${hiraganaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].romaji}`;
        ansImg2.src = `${hiraganaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].romaji}`;
        ansImg3.src = `${hiraganaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].romaji}`;
        ansImg4.src = `${hiraganaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].romaji}`;
    }
    else if (q === 'romaji' && a === 'hiragana') {
        ansImg1.src = `${hiraganaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].kana}`;
        ansImg2.src = `${hiraganaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].kana}`;
        ansImg3.src = `${hiraganaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].kana}`;
        ansImg4.src = `${hiraganaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].kana}`;
    }
    else if (q === 'katakana' && a === 'romaji') {
        ansImg1.src = `${katakanaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].romaji}`;
        ansImg2.src = `${katakanaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].romaji}`;
        ansImg3.src = `${katakanaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].romaji}`;
        ansImg4.src = `${katakanaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].romaji}`;    
    }
    else if (q === 'romaji' && a === 'katakana') {
        ansImg1.src = `${katakanaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].kana}`;
        ansImg2.src = `${katakanaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].kana}`;
        ansImg3.src = `${katakanaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].kana}`;
        ansImg4.src = `${katakanaValues[getRandomIntInclusive(1, hiraganaValues.length-1)].kana}`;   
    }

    console.log('getRandomAnswers');
}

function chooseAnswer(q, a) {
    // Add event listeners to all 4 possible answers
    // When any answer is clicked, it triggers a callback function (anonymous) that
    // determines if it is correct or not.

    // How to check if the answer is correct?
    // 1. Both the question and answer sources are taken
    // 2. Syllabe image sources come in specific pairs
    // 3. Check if the particular combination in the user selection
    //    exists
    // 4. If it does, it's a correct answer. If not, it's incorrect

    const question = document.getElementById('question');
    const ans1 = document.getElementById('img1');
    const ans2 = document.getElementById('img2');
    const ans3 = document.getElementById('img3');
    const ans4 = document.getElementById('img4');

    if (q === 'hiragana' && a === 'romaji') {
        ans1.addEventListener('click', (event) => {
            if (hiraganaValues.includes( { kana: question.src, romaji: ans1.src } )) {
                check = true;
            }
            else {
                check = false;
            }
            
            checkAnswer();
            counter++;
        });
        ans2.addEventListener('click', (event) => {
            if (hiraganaValues.includes( { kana: question.src, romaji: ans2.src } )) {
                check = true;
            }
            else {
                check = false;
            }
            
            checkAnswer();
            counter++;
        });
        ans3.addEventListener('click', (event) => {
            if (hiraganaValues.includes( { kana: question.src, romaji: ans3.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans4.addEventListener('click', (event) => {
            if (hiraganaValues.includes( { kana: question.src, romaji: ans4.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
    }
    else if (q === 'romaji' && a === 'hiragana') {
        ans1.addEventListener('click', (event) => {
            if (hiraganaValues.includes( { kana: ans1.src, romaji: question.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans2.addEventListener('click', (event) => {
            if (hiraganaValues.includes( { kana: ans2.src, romaji: question.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans3.addEventListener('click', (event) => {
            if (hiraganaValues.includes( { kana: ans3.src, romaji: question.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans4.addEventListener('click', (event) => {
            if (hiraganaValues.includes( { kana: ans4.src, romaji: question.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
    }
    else if (q === 'katakana' && a === 'romaji') {
        ans1.addEventListener('click', (event) => {
            if (katakanaValues.includes( { kana: question.src, romaji: ans1.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans2.addEventListener('click', (event) => {
            if (katakanaValues.includes( { kana: question.src, romaji: ans2.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans3.addEventListener('click', (event) => {
            if (katakanaValues.includes( { kana: question.src, romaji: ans3.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans4.addEventListener('click', (event) => {
            if (katakanaValues.includes( { kana: question.src, romaji: ans4.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
    }
    else if (q === 'romaji' && a === 'katakana') {
        ans1.addEventListener('click', (event) => {
            if (katakanaValues.includes( { kana: ans1.src, romaji: question.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans2.addEventListener('click', (event) => {
            if (katakanaValues.includes( { kana: ans2.src, romaji: question.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans3.addEventListener('click', (event) => {
            if (katakanaValues.includes( { kana: ans3.src, romaji: question.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
        ans4.addEventListener('click', (event) => {
            if (katakanaValues.includes( { kana: ans4.src, romaji: question.src } )) {
                check = true;
            }
            else {
                check = false;
            }

            checkAnswer();
            counter++;
        });
    }
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

function loopPractice(q, a) {
    getRandomQuestion(q, a);
    getRandomAnswers(q, a);

    temp_counter = counter;

    while (counter < 100) {
        // If some answer was clicked (this changes the counter variable)
        if (temp_counter != counter) {
            // Update variables on screen
            counterID.innerText = counter.toString();
            successesID.innerText = successes.toString();
            failsID.innerText = fails.toString();
            successPercentID.innerText = successPercent.toString();
            
            loopPractice(q, a);
        }
        // Else, keep waiting for answer clicked   
    }    
}

function initPractice(q, a) {
    // Set event listeners for answer group. Must be run
    // only ONCE per session to avoid memory issues 
    chooseAnswer(q, a);
    loopPractice(q, a);
    
    // Finish and go back to menu
    // window.location.href = '../pages/index.html';
    
}

export { initPractice };