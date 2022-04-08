let conditions = [
    new validatingCondition('name', new RegExp('^[A-Z][a-z]+$')),
    new validatingCondition('age', new RegExp('^(0|([1-9][0-9]?[0-9]?))$')),
    new validatingCondition('phone', new RegExp('^\\([0-9][0-9][0-9]\\)[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$')),
    new validatingCondition('comment', new RegExp('^(?!\s*$).+')),
]; 
let inputs = [];
spawnValidatedInputs();
attachSubmitEventToForm();

function attachSubmitEventToForm() {
    document.querySelector('.form').addEventListener('submit', (e) => validateAllInputs(e) );
}

function spawnValidatedInputs() {
    for(let condition of conditions) {
        inputs.push(new validatingInput(condition));
    }
}

function validateAllInputs(e) {
    assignInvalidClasses();
    if(someInputsAreInvalid()) {
        preventSubmission();
    }

    function preventSubmission() {
        e.preventDefault();
    }

    function someInputsAreInvalid() {
        return document.querySelectorAll('.error-visible').length > 0;
    }

    function assignInvalidClasses() {
        for(let input of inputs) {
            input.assignAfterSumbissionClasses();
        }
    }
}

function validatingInput(condition) {
    let temp = document.querySelector('input[name=' + condition.selector + ']');
    let elem = temp ? temp : document.querySelector('textarea[name=' + condition.selector + ']');
    let regex = condition.regex;
    let errorContainer = elem.parentElement.parentElement.querySelector('.error-message');

    elem.onblur = () => assignBeforeSubmissionClasses();

    this.assignAfterSumbissionClasses = function() {
        if(!isValidAfterSubmission()) {
            errorContainer.classList.add('error-visible');
        }
    };

    let assignBeforeSubmissionClasses = function() {
        if(isValidBeforeSubmission()) {
            if(errorContainer.classList.contains('error-visible'))
                errorContainer.classList.remove('error-visible');
        }
        else {
            errorContainer.classList.add('error-visible');
        }
    };

    let isValidAfterSubmission = () =>  regex.test(elem.value);

    let isValidBeforeSubmission = () => elem.value == '' || regex.test(elem.value);
}

function validatingCondition(inputName, regularExpression) {
    this.selector = inputName;
    this.regex = regularExpression;
}