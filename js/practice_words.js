import { words } from "./syllabeValues";

var input = localStorage.getItem('input');

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
