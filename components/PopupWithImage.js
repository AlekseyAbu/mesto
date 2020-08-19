import {Popup} from './Popup.js';

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector)
    }
    open(data){
        const popupLink = document.querySelector('.popup-img__img');
        const popupName = document.querySelector('.popup-img__text');
        popupLink.src = data.link;
        popupLink.alt = data.link;
        popupName.textContent = data.name;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
    }
}