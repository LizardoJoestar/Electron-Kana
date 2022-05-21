var record = document.getElementById('record');
var num;

// This executes after everything else (async?)
fetch('../data/records.json').then(response => response.json()).then(data => {
    console.log(data);
    record.innerText = data.maxConsecutiveSuccesses.toString();
});
