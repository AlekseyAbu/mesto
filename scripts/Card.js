import {keyHandler, popupAdd} from './utils.js';

console.log(keyHandler);

export class Card {
    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('#card')//не очень понял, что Вы имеете в виду?
        .content
        .querySelector('.card')
        .cloneNode(true);

        this._element = cardElement;
        return this._element;
    }

    generedCard() {
        this._getTemplate();
        this._element.querySelector('.card__title').textContent = this._name;
        const cardImg = this._element.querySelector('.card__img');
        cardImg.src = this._link;
        cardImg.alt = this._link;
        this._cardLabelLike();
        this._basketEventListener();
        this._addHandlerPopup();

        return this._element;
    }

    _deleteLike () {
        this._element.querySelector('.card__label-like').classList.toggle('card__label-like_black');
    }
    _cardLabelLike() {
        this._element.querySelector('.card__label-like').addEventListener('click', () => {
            this._deleteLike();
        })
    }

    _deleteCard() {
        this._element.closest('.card').remove();
        this._element = null;
    }
    _basketEventListener() {
        this._element.querySelector('.card__basket').addEventListener('click',  () => {
            this._deleteCard();
        });
    }

    _addHandlerPopup(){
        const cardImg = this._element.querySelector('.card__img');
        cardImg.addEventListener('click', _ => {
            const popupLink = document.querySelector('.popup-img__img');
            const popupName = document.querySelector('.popup-img__text');
            const popupImgOpen = document.querySelector('.popup-img');
            popupLink.src = this._link;
            popupName.textContent = this._name;
            console.log(this._link);
            console.log(this._name);
            popupAdd(popupImgOpen);
        })
    }
}
