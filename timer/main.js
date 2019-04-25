;(function() {
    'use strict'

    var timeInput = document.getElementById('time_input')
    var clearButton = document.getElementById('clear')
    var startButton = document.getElementById('start')
    var stopButton = document.getElementById('stop')
    var timerNode = document.getElementById('timer')
    var toggleFullscreenButton = document.getElementById('toggle_fullscreen')

    var isDone, isFullscreen, timer, timerValue

    timerNode.textContent = timeInput.value

    function captureInput(event) {
        event.preventDefault()
        var key = event.key

        if (key === 'Backspace') {
            var value = unformatAsString(timeInput.value)
            value = '0' + value.slice(0, value.length - 1)
            timeInput.value = formatTimeString(value)
        }

        if (!isNaN(key)) {
            var value = unformatAsString(timeInput.value)
            value = value.slice(1) + key
            timeInput.value = formatTimeString(value)
        }
    }

    function formatTimeString(str) {
        var split = splitTimeString(str)

        return (
            forceTwoDigits(split.hours) +
            'h ' +
            forceTwoDigits(split.minutes) +
            'm ' +
            forceTwoDigits(split.seconds) +
            's'
        )
    }

    function formatTimeNumberAsString(numInMs) {
        var num = numInMs / 1000
        var hours = 0,
            minutes = 0
        if (num >= 3600) {
            hours = Math.floor(num / 3600)
            num -= 3600 * hours
        }
        if (num >= 60) {
            minutes = Math.floor(num / 60)
            num -= 60 * minutes
        }
        var str =
            forceTwoDigits(hours) +
            forceTwoDigits(minutes) +
            forceTwoDigits(num)
        return formatTimeString(str)
    }

    function forceTwoDigits(input) {
        var str = typeof input === 'number' ? input.toString() : input
        if (str.length < 2) {
            return '0' + str
        }
        return str
    }

    function unformatAsString(str) {
        return str.replace(/[a-z] ?/g, '')
    }

    function splitTimeString(str) {
        return {
            hours: str.slice(0, 2),
            minutes: str.slice(2, 4),
            seconds: str.slice(4, 6)
        }
    }

    function convertTimeStringToMs(formatted) {
        var str = unformatAsString(formatted)
        var split = splitTimeString(str)

        return (
            split.hours * 3.6 * 1000000 +
            split.minutes * 6 * 10000 +
            split.seconds * 1000
        )
    }

    function runTimer() {
        timerValue = timerValue > 0 ? timerValue - 1000 : 0
        timerNode.textContent = formatTimeNumberAsString(timerValue)

        if (timerValue <= 0) {
            clearInterval(timer)
            isDone = true
        }
    }

    function startTimer() {
        isDone = false
        var inputValue = timeInput.value
        timerValue = convertTimeStringToMs(inputValue)
        var formattedTime = formatTimeNumberAsString(timerValue)
        timeInput.value = formattedTime
        timerNode.textContent = formattedTime

        timer = setInterval(runTimer, 1000)
    }

    function stopTimer() {
        clearInterval(timer)
    }

    function clearTimer() {
        stopTimer()
        timerValue = 0
        var formattedTime = formatTimeNumberAsString(timerValue)
        timeInput.value = formattedTime
        timerNode.textContent = formattedTime
    }

    function toggleFullscreen(event) {
        var displayNode = document.querySelector('.display'),
            className = 'display--fullscreen'
        if (event.target.checked) {
            displayNode.classList.add(className)
        } else {
            displayNode.classList.remove(className)
        }
    }

    timeInput.addEventListener('keydown', captureInput)
    clearButton.addEventListener('click', clearTimer)
    startButton.addEventListener('click', startTimer)
    stopButton.addEventListener('click', stopTimer)
    toggleFullscreenButton.addEventListener('click', toggleFullscreen)
})()
