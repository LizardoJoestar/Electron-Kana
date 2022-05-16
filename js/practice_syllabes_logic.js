// Syllabe image sources. These serve to present both the question and the
// possible answers
import { hiraganaValues, katakanaValues } from "./syllabeValues.js";

// Selection variables for question and answer
var q = '';
var a = '';

// Tracking variables
var check = false;
var successes = 0;
var fails = 0;
var successPercent = 0;
var counter = 0;

// Set up tracking variables-DOM id selection
let counterID = document.getElementById('counter');
let successesID = document.getElementById('successes');
let failsID = document.getElementById('fails');
let successPercentID = document.getElementById('success-percent');

// Question image and answers images DOM id selection
let question = document.getElementById('question');
let ans1 = document.getElementById('img1');
let ans2 = document.getElementById('img2');
let ans3 = document.getElementById('img3');
let ans4 = document.getElementById('img4');


// Set up algorithm steps as functions (some of them):
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
    //The maximum is inclusive and the minimum is inclusive
  }  

function getRandomQuestion() {
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
    else if (q === 'romaji' && a === 'katakana') {
        questionImg.src = `${katakanaValues[index].romaji}`;
    }
    console.log('getRandomQuestion:');
    console.log(questionImg.src);
}

function getRandomAnswers() {
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

    console.log('getRandomAnswers:');
    console.log([ansImg1, ansImg2, ansImg3, ansImg4]);
}

function chooseAnswer(answer, objOrder, kanaValues) {
    // Add event listeners to all 4 possible answers
    // When any answer is clicked, it triggers a callback function (anonymous) that
    // determines if it is correct or not.

    // How to check if the answer is correct?
    // 1. Both the question and answer sources are taken
    // 2. Syllabe image sources come in specific pairs
    // 3. Check if the particular combination in the user selection
    //    exists
    // 4. If it does, it's a correct answer. If not, it's incorrect

    answer.addEventListener('click', (event) => {
        // Format question.src and ans(n).src to match strings in DB
        // Get the src strings, which will be like this:
            // file:///home/khas/Git/Electron-Kana/img/hiragana/hira-e.png
            // file:///home/khas/Git/Electron-Kana/img/romaji/roma-e.png
        let questionSRC = question.src;
        let answerSRC = answer.src;

        // Split strings into an array, by '/' (valid only for UNIX OSs!!)
        let array1 = questionSRC.split('/');
        let array2 = answerSRC.split('/');

        // Rebuild the strings into their correct forms (as in DB):
        questionSRC = '../' + array1[array1.length-3] + '/' + array1[array1.length-2] + '/' + array1[array1.length-1];
        answerSRC = '../' + array2[array2.length-3] + '/' + array2[array2.length-2] + '/' + array2[array2.length-1];

        // Create an object to search using the specified order in 'objOrder' parameter:
        if (objOrder.kana === 'questionSRC' && objOrder.romaji === 'answerSRC') {
            objOrder.kana = questionSRC;
            objOrder.romaji = answerSRC;
        }
        else if (objOrder.kana === 'answerSRC' && objOrder.romaji === 'questionSRC') {
            objOrder.kana = answerSRC;
            objOrder.romaji = questionSRC;
        }

        // Remember that in javascript objects cannot be compared directly.
        // Convert them to a JSON string and then compare as normal!!!

        // Update check variables, and counter (using rebuilt strings!!)
        if (kanaValues.some(element => JSON.stringify(objOrder) === JSON.stringify(element))) {
            check = true;
            console.log('q: '+ questionSRC + ' a: ' + answerSRC);
        }
        else {
            check = false;
            console.log('q: '+ questionSRC + ' a: ' + answerSRC);
        }
        
        checkAnswer();
        counter++;

        // Then update screen variables
        updateScreenVariables();

        // And determine if looping is needed:
        if (counter < 10) {
            // Reset the question and answers
            setQA();
        }
        else {
            // When finished, go back to main menu
            window.location.href = '../pages/index.html';
        }
    });
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

function setQA() {
    getRandomQuestion();
    getRandomAnswers();
}

function updateScreenVariables() {
    // Update variables on screen
    counterID.innerText = counter.toString();
    successesID.innerText = successes.toString();
    failsID.innerText = fails.toString();
    successPercentID.innerText = successPercent.toString();    
}

function initPractice(question, answer) {
    // Set global selection variables once:
    q = question;
    a = answer;

    // Set event listeners for answer group. Must be run
    // only ONCE per session to avoid memory issues 

    if (q === 'hiragana' && a === 'romaji') {
        chooseAnswer(ans1, { kana: 'questionSRC', romaji: 'answerSRC' }, hiraganaValues);
        chooseAnswer(ans2, { kana: 'questionSRC', romaji: 'answerSRC' }, hiraganaValues);
        chooseAnswer(ans3, { kana: 'questionSRC', romaji: 'answerSRC' }, hiraganaValues);
        chooseAnswer(ans4, { kana: 'questionSRC', romaji: 'answerSRC' }, hiraganaValues);
    }
    else if (q === 'romaji' && a === 'hiragana') {
        chooseAnswer(ans1, { kana: 'answerSrC', romaji: 'questionSRC' }, hiraganaValues);
        chooseAnswer(ans2, { kana: 'answerSrC', romaji: 'questionSRC' }, hiraganaValues);
        chooseAnswer(ans3, { kana: 'answerSrC', romaji: 'questionSRC' }, hiraganaValues);
        chooseAnswer(ans4, { kana: 'answerSrC', romaji: 'questionSRC' }, hiraganaValues);
    }
    else if (q === 'katakana' && a === 'romaji') {
        chooseAnswer(ans1, { kana: 'questionSRC', romaji: 'answerSRC' }, katakanaValues);
        chooseAnswer(ans2, { kana: 'questionSRC', romaji: 'answerSRC' }, katakanaValues);
        chooseAnswer(ans3, { kana: 'questionSRC', romaji: 'answerSRC' }, katakanaValues);
        chooseAnswer(ans4, { kana: 'questionSRC', romaji: 'answerSRC' }, katakanaValues);
    }
    else if (q === 'romaji' && a === 'katakana') {
        chooseAnswer(ans1, { kana: 'answerSrC', romaji: 'questionSRC' }, katakanaValues);
        chooseAnswer(ans2, { kana: 'answerSrC', romaji: 'questionSRC' }, katakanaValues);
        chooseAnswer(ans3, { kana: 'answerSrC', romaji: 'questionSRC' }, katakanaValues);
        chooseAnswer(ans4, { kana: 'answerSrC', romaji: 'questionSRC' }, katakanaValues);
    }

    // Print screen variables for first time once
    updateScreenVariables();
    
    // Set Question and Answers for first time once
    setQA();

    // Then give logic control to answer envent listeners...
}

export { initPractice };