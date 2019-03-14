var outputList = document.getElementById('outputList');
var problemsInput = document.getElementById('problemsInput');
var placesInput = document.getElementById('placesInput');

function generateTable() {
    clearErrors();
    var isError = false;
    var problems = problemsInput.value;
    var places = placesInput.value;
    if (problems.length === 0) {
        displayErrorOn('problemsLabel');
        isError = true;
    }
    if (places.length === 0) {
        displayErrorOn('placesLabel')
        isError = true;
    }
    if (isError) {
        return;
    }
    clearTable();
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

function clearErrors() {
    document.querySelectorAll('.ErrorMessage').forEach(node => node.remove());
    document.querySelectorAll('.--has-error').forEach(node => node.classList.remove('--has-error'));
}

function displayErrorOn(id) {
    var el = document.getElementById(id);
    el.classList.add('--has-error');
    var p = document.createElement('p')
    p.classList.add('ErrorMessage');
    p.textContent = 'Uh oh! This value must be a valid number.';
    el.appendChild(p);
}

generateTable();

problemsInput.addEventListener('change', generateTable);
placesInput.addEventListener('change', generateTable);