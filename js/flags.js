// check for button clicks
// and set flags in localstorage
document.getElementById('HR').onclick = function setFlags1() {
    localStorage.setItem('questions', 'hiragana');
    localStorage.setItem('answers', 'romaji');
    window.location.href = '../pages/practice_syllabes.html';
};

document.getElementById('RH').onclick = function setFlags2() {
    localStorage.setItem('questions', 'romaji');
    localStorage.setItem('answers', 'hiragana');
    window.location.href = '../pages/practice_syllabes.html';
};

document.getElementById('KR').onclick = function setFlags3() {
    localStorage.setItem('questions', 'katakana');
    localStorage.setItem('answers', 'romaji');
    window.location.href = '../pages/practice_syllabes.html';
};

document.getElementById('RK').onclick = function setFlags4() {
    localStorage.setItem('questions', 'romaji');
    localStorage.setItem('answers', 'katakana');
    window.location.href = '../pages/practice_syllabes.html';
};