var timeInput = document.getElementById('time-input');

function captureInput(event) {
    event.preventDefault();
    var key = event.key;

    if (key === 'Backspace') {
        var value = unformatAsString(timeInput.value);
        // for (var i = value.length - 1; i >= 0; i++) {
        //     if (value[i] !== '0') {
        //         value = value.slice(0, i) + '0' + value.slice(i + 1);
        //         // value[i] = '0';
        //         break;
        //     }
        // }
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
    var hours = str.slice(0, 2),
        minutes = str.slice(2, 4),
        seconds = str.slice(4, 6);

    return (
        forceTwoDigits(hours) +
        'h ' +
        forceTwoDigits(minutes) +
        'm ' +
        forceTwoDigits(seconds) +
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

timeInput.addEventListener('keydown', captureInput);
