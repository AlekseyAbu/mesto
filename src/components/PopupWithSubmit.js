import {Popup} from './Popup.js';

export class PopupWithSubmit extends Popup{
    constructor(popupSelector) {
        super(popupSelector)
        this._popupElement = document.querySelector(this._popupSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
          })
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }

}