var outputList = document.getElementById('outputList');
var problemsInput = document.getElementById('problemsInput');
var placesInput = document.getElementById('placesInput');

function generateTable() {
    clearTable();
    var problems = problemsInput.value;
    var places = placesInput.value;
    for (var i = 0; i <= problems; i++) {
        var value = problems - i;
        var li = document.createElement('li');

        var fractionSpan = document.createElement('span');
        fractionSpan.textContent = value + '/' + problems;
        li.appendChild(fractionSpan);

        var percentSpan = document.createElement('span');
        percentSpan.textContent = (100 * value / problems).toFixed(places) + '%';
        li.appendChild(percentSpan);

        outputList.appendChild(li);
    }
}

function clearTable() {
    while (outputList.firstChild) {
        outputList.removeChild(outputList.firstChild);
    }
}

generateTable();

problemsInput.addEventListener('change', generateTable);
placesInput.addEventListener('change', generateTable);