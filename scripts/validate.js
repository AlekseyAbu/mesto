

function enableValidation ({formElement, ...rest}) {
    const forms = Array.from(document.querySelectorAll(formElement));
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        setEventListernes(form, rest);
    });
};

function setEventListernes(form, { inputElement, submitButtonSelector, inactiveButtonClass, ...rest}) {
    const inputs = Array.from(form.querySelectorAll(inputElement));
    const button = form.querySelector(submitButtonSelector);
    //const inactiveButton = document.querySelector(inactiveButtonClass);
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            isValid(form, input, rest);
            toggleButtonState(inactiveButtonClass, inputs, input, button);
        })
        
    })
}

function isValid(form, input, {inputErrorClass, errorClass}){
    const inputError = document.querySelector(inputErrorClass);
    const error = document.querySelector(errorClass);
    if(input.validity.valid){
        hideInputError(form, input, inputErrorClass, errorClass);
    }
    else{
        showInputError(form, input, inputErrorClass, errorClass);
    }
}

function hideInputError (form, input, inputErrorClass, errorClass) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function showInputError (form, input, inputErrorClass, errorClass) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
}

function hasInvalidInput(inputs){
    return inputs.some((input) => {
    return !input.validity.valid;
    });
}

function toggleButtonState(inactiveButtonClass, inputs, input, button){//изменение цвета кнопки
    if (hasInvalidInput(inputs)) {
        button.classList.add(inactiveButtonClass);
        button.setAttribute('disabled', true);
    } 
    else {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute('disabled');
    }
}
