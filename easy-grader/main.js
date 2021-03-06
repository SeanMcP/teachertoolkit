;(function() {
    var outputList = document.getElementById('output_list')
    var problemsInput = document.getElementById('problems_input')
    var placesInput = document.getElementById('places_input')

    function generateTable() {
        clearErrors()
        var isError = false
        var problems = problemsInput.value
        var places = placesInput.value
        if (problems.length === 0) {
            displayErrorOn('problems_label')
            isError = true
        }
        if (places.length === 0) {
            displayErrorOn('places_label')
            isError = true
        }
        if (isError) {
            return
        }
        clearTable()
        var fractionSpanWidth
        var percentSpanWidth
        for (var i = 0; i <= problems; i++) {
            var value = problems - i
            var li = document.createElement('li')
            li.classList.add('grade-list__item')

            var fractionSpan = document.createElement('span')
            fractionSpan.classList.add(
                'grade-list__value',
                'grade-list__fraction'
            )
            fractionSpan.textContent = value + '/' + problems
            if (fractionSpanWidth) {
                fractionSpan.style.width = fractionSpanWidth + 'px'
            }
            li.appendChild(fractionSpan)

            var percentSpan = document.createElement('span')
            percentSpan.classList.add('grade-list__value', 'grade-list__percent')
            percentSpan.textContent =
                ((100 * value) / problems).toFixed(places) + '%'
            if (percentSpanWidth) {
                percentSpan.style.width = percentSpanWidth + 'px'
            }
            li.appendChild(percentSpan)

            outputList.appendChild(li)

            if (i === 0) {
                fractionSpanWidth = fractionSpan.getBoundingClientRect().width
                percentSpanWidth = percentSpan.getBoundingClientRect().width
            }
        }
    }

    function clearTable() {
        while (outputList.firstChild) {
            outputList.removeChild(outputList.firstChild)
        }
    }

    function clearErrors() {
        document
            .querySelectorAll('.ErrorMessage')
            .forEach(node => node.remove())
        document
            .querySelectorAll('.--has-error')
            .forEach(node => node.classList.remove('--has-error'))
    }

    function displayErrorOn(id) {
        var el = document.getElementById(id)
        el.classList.add('--has-error')
        var p = document.createElement('p')
        p.classList.add('ErrorMessage')
        p.textContent = 'Uh oh! This value must be a valid number.'
        el.appendChild(p)
    }

    generateTable()

    problemsInput.addEventListener('change', generateTable)
    placesInput.addEventListener('change', generateTable)
})()
