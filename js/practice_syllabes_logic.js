// Syllabe image sources. These serve to present both the question and the
// possible answers
import { hiraganaValues, katakanaValues } from "./syllabeValues.js";
// import * as fs from 'fs/promises'

// Selection variables for question and answer
var q = '';
var a = '';

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
    let index = getRandomIntInclusive(0, hiraganaValues.length-1);

    // Show the question
    if (q === 'hiragana' && a === 'romaji') {
        question.src = `${hiraganaValues[index].kana}`;
    }
    else if (q === 'romaji' && a === 'hiragana') {
        question.src = `${hiraganaValues[index].romaji}`;
    }
    else if (q === 'katakana' && a === 'romaji') {
        question.src = `${katakanaValues[index].kana}`;
    }
    else if (q === 'romaji' && a === 'katakana') {
        question.src = `${katakanaValues[index].romaji}`;
    }
}

function getRandomAnswers(kanaValues, property) {
    // Steps for setting one random correct answer, and three
    // random incorrect answers:
        // 1. Create list of answers
        // 2. Randomly select one, set source to match question source
        // 3. Randomly set source of remaining three answers (repetitions happen!)

    var answerList = [ans1, ans2, ans3, ans4];
    var correctAns = getRandomIntInclusive(0,3);
    var index = 0;

    // Convert each object in hiraganaValues to JSON string, then
    // search within it the question.src string. If found, take the
    // index of such element to set the correct answer src property
    // to match the question.src, as it appears in the DB
    kanaValues.forEach(element => {
        if (JSON.stringify(element).includes(formatSourceToDB(question.src))) {
            index = kanaValues.indexOf(element);  
            console.log('index: ' + index);
        }
    });

    if (property === 'romaji') {
        answerList[correctAns].src = kanaValues[index].romaji;
        console.log('answerList[correctAns].src: ' + answerList[correctAns].src);
        console.log('kanaValues[index].romaji: ' + kanaValues[index].romaji);

        // Set the rest of the answers's sources strings
        answerList.forEach(element => {
            if (answerList.indexOf(element) != correctAns) {
                element.src = `${kanaValues[getRandomIntInclusive(0, kanaValues.length-1)].romaji}`;
            }
        });
    }
    else if (property === 'kana') {
        answerList[correctAns].src = kanaValues[index].kana;
        console.log('answerList[correctAns].src: ' + answerList[correctAns].src);
        console.log('kanaValues[index].kana: ' + kanaValues[index].kana);

        // Set the rest of the answers's sources strings
        answerList.forEach(element => {
            if (answerList.indexOf(element) != correctAns) {
                element.src = `${kanaValues[getRandomIntInclusive(0, kanaValues.length-1)].kana}`;
            }
        });
    }    
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
        let questionSRC = formatSourceToDB(question.src);
        let answerSRC = formatSourceToDB(answer.src);

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
            console.log('CORRECT');
            console.log(JSON.stringify(objOrder));
        }
        else {
            check = false;
            console.log('INCORRECT');
            console.log(JSON.stringify(objOrder));
        }
        
        checkAnswer();
        counter++;

        // Then update screen variables
        updateScreenVariables();

        // And determine if looping is needed:
        if (counter <= maxQuestions) {
            // Reset the question and answers
            setQA();
        }
        else {
            // Read maxConsecuteSuccesses data from records file
            // let record = JSON.parse(fs.readFile('../data/records.json')).maxConsecutiveSuccesses;
            // if (record < successes) {
            //     // Create temp object, copy of records file
            //     let tempObj = JSON.parse(fs.readFile('../data/records.json'));
                
            //     // Modify temp object with new current record
            //     tempObj.maxConsecutiveSuccesses = successes; 

            //     // Overwrite record file with temp object
            //     fs.writeFile('../data/records.json', JSON.stringify(tempObj));
            // }
            
            // When finished, go back to main menu
            window.location.href = '../pages/index.html';
        }
    });
    console.log('Added event listener for: ' + answer.alt);
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

    if (q === 'hiragana' && a === 'romaji') {
        getRandomAnswers(hiraganaValues, 'romaji');
    }
    else if (q === 'romaji' && a === 'hiragana') {
        getRandomAnswers(hiraganaValues, 'kana');
    }
    else if (q === 'katakana' && a === 'romaji') {
        getRandomAnswers(katakanaValues, 'romaji');
    }
    else if (q === 'romaji' && a === 'katakana') {
        getRandomAnswers(katakanaValues, 'kana');
    }
    // getRandomAnswers();
}

function updateScreenVariables() {
    // Update variables on screen
    counterID.innerText = counter.toString();
    successesID.innerText = successes.toString();
    failsID.innerText = fails.toString();
    successPercentID.innerText = successPercent.toFixed(2).toString();    
}

function formatSourceToDB(source) {
    // Format question.src and ans(n).src to match strings in DB
    // Get the src strings, which will be like this:
        // file:///home/khas/Git/Electron-Kana/img/hiragana/hira-e.png
        // file:///home/khas/Git/Electron-Kana/img/romaji/roma-e.png
    
    // Split strings into an array, by '/' (valid only for UNIX OSs!!)
    let array = source.split('/');

    // Rebuild the strings into their correct forms (as in DB):
    return source = '../' + array[array.length-3] + '/' + array[array.length-2] + '/' + array[array.length-1];
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
        chooseAnswer(ans1, { kana: 'answerSRC', romaji: 'questionSRC' }, hiraganaValues);
        chooseAnswer(ans2, { kana: 'answerSRC', romaji: 'questionSRC' }, hiraganaValues);
        chooseAnswer(ans3, { kana: 'answerSRC', romaji: 'questionSRC' }, hiraganaValues);
        chooseAnswer(ans4, { kana: 'answerSRC', romaji: 'questionSRC' }, hiraganaValues);
    }
    else if (q === 'katakana' && a === 'romaji') {
        chooseAnswer(ans1, { kana: 'questionSRC', romaji: 'answerSRC' }, katakanaValues);
        chooseAnswer(ans2, { kana: 'questionSRC', romaji: 'answerSRC' }, katakanaValues);
        chooseAnswer(ans3, { kana: 'questionSRC', romaji: 'answerSRC' }, katakanaValues);
        chooseAnswer(ans4, { kana: 'questionSRC', romaji: 'answerSRC' }, katakanaValues);
    }
    else if (q === 'romaji' && a === 'katakana') {
        chooseAnswer(ans1, { kana: 'answerSRC', romaji: 'questionSRC' }, katakanaValues);
        chooseAnswer(ans2, { kana: 'answerSRC', romaji: 'questionSRC' }, katakanaValues);
        chooseAnswer(ans3, { kana: 'answerSRC', romaji: 'questionSRC' }, katakanaValues);
        chooseAnswer(ans4, { kana: 'answerSRC', romaji: 'questionSRC' }, katakanaValues);
    }

    // Print screen variables for first time once
    updateScreenVariables();
    
    // Set Question and Answers for first time once
    setQA();

    // Then give logic control to answer event listeners...
}

export { initPractice };