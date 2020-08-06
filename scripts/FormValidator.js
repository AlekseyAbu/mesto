

export class FormValidator {
    constructor(config, form) {
        this._formElement = config.formElement;
        this._inputElement = config.inputElement;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
    }

    enableValidation() {
        const forma = document.querySelector(this._form)
        forma.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        this._setEventListernes(forma);
    }

    _setEventListernes(forma) {
        const inputs = Array.from(forma.querySelectorAll(this._inputElement));
        inputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                this._isValid(input, forma);
                this._toggleButtonState(inputs, forma);
            })   
        })
    }

    _isValid(input, forma) {
        if(input.validity.valid){
            this._hideInputError(forma, input);
        }
        else{
            this._showInputError(forma, input);
        }
    }

    _hideInputError(forma, input) {
        const errorElement = forma.querySelector(`#${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _showInputError(forma, input) {
        const errorElement = forma.querySelector(`#${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hasInvalidInput(inputs) {
        return inputs.some((input) => {
        return !input.validity.valid;
        });
    }

    _toggleButtonState(inputs, forma) {
        if (this._hasInvalidInput(inputs)) {
            forma.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
            forma.querySelector(this._submitButtonSelector).setAttribute('disabled', true);
        } 
        else {
            forma.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
            forma.querySelector(this._submitButtonSelector).removeAttribute('disabled');
        }
    }
}
