import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
    constructor(popupSelector, {submitForm}) {
        super(popupSelector)
        this._submitForm = submitForm;
        this._popupElement = document.querySelector(this._popupSelector)
    }
    
    _getInputValues() {
        const inputs = Array.from(this._popupElement.querySelectorAll('.popup__input'));
        this._formValue = {};
        inputs.forEach((item) => {
            this._formValue[item.name] = item.value;
        })
        return this._formValue
    }

    setEventListeners() {
        super.setEventListeners();
        this._formPopup = this._popupElement.querySelector('.popup__form');
        this._formPopup.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = this._getInputValues()
            this._submitForm(data)
        })
    }

    close() {
        super.close();
    }
}