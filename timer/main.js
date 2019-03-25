var timeInput = document.getElementById('time-input');
var startButton = document.getElementById('start');

var timer, timerValue;

function captureInput(event) {
    event.preventDefault();
    var key = event.key;

    if (key === 'Backspace') {
        var value = unformatAsString(timeInput.value);
        value = '0' + value.slice(0, value.length - 1);
        timeInput.value = formatTimeString(value);
    }

    if (!isNaN(key)) {
        var value = unformatAsString(timeInput.value);
        value = value.slice(1) + key;
        timeInput.value = formatTimeString(value);
    }
}

function formatTimeString(str) {
    var split = splitTimeString(str);

    return (
        forceTwoDigits(split.hours) +
        'h ' +
        forceTwoDigits(split.minutes) +
        'm ' +
        forceTwoDigits(split.seconds) +
        's'
    );
}

function forceTwoDigits(input) {
    var str = typeof input === 'number' ? input.toString() : input;
    if (str.length < 2) {
        return '0' + str;
    }
    return str;
}

function unformatAsString(str) {
    return str.replace(/[a-z] ?/g, '');
}

function splitTimeString(str) {
    return {
        hours: str.slice(0, 2),
        minutes: str.slice(2, 4),
        seconds: str.slice(4, 6)
    };
}

function convertTimeStringToMs(formatted) {
    var str = unformatAsString(formatted);
    var split = splitTimeString(str);

    return (
        split.hours * 3.6 * 1000000 +
        split.minutes * 6 * 10000 +
        split.seconds * 1000
    );
}

function startTimer() {
    var inputValue = timeInput.value;
    timerValue = convertTimeStringToMs(inputValue);
    console.log(timerValue);

    timer = setTimeout(function() {
        timerValue -= 1000;
        console.log(timerValue);
    }, 1000);
}

timeInput.addEventListener('keydown', captureInput);
startButton.addEventListener('click', startTimer);
