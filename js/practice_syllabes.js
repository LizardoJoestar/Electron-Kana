import { initPractice } from "./practice_syllabes_logic.js";

// Read flags from localStorage
const questions = localStorage.getItem('questions');
const answers = localStorage.getItem('answers');

// Get elements from page
const Q = document.getElementById('Q');
const A = document.getElementById('A');

// Practice modules
if (questions === 'hiragana' && answers === 'romaji')
{
    Q.innerText = 'Hiragana';
    A.innerText = 'Romaji';

    initPractice('hiragana', 'romaji');
};

if (questions === 'romaji' && answers === 'hiragana')
{
    Q.innerText = 'Romaji';
    A.innerText = 'Hiragana';

    initPractice('romaji', 'hiragana');
};

if (questions === 'katakana' && answers === 'romaji')
{
    Q.innerText = 'Katakana';
    A.innerText = 'Romaji';

    initPractice('katakana', 'romaji');
};

if (questions === 'romaji' && answers === 'katakana')
{
    Q.innerText = 'Romaji';
    A.innerText = 'Katakana';

    initPractice('romaji', 'katakana');
};