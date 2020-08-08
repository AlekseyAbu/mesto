const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

import {popupAdd, popupRemove} from './script.js';

export class Card {
    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector('#card')
        .content
        .querySelector('.card')
        .cloneNode(true);

        this._element = cardElement;
        return this._element;
    }

    generedCard() {
        this._getTemplate();
        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__img').src = this._link;
        this._element.querySelector('.card__img').alt = this._link;
        this._cardLabelLike();
        this._basketEventListener();

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
}

initialCards.forEach ((item) =>  {
    const card = new Card(item, '.card'); 
    const cardElement = card.generedCard();

    const popupImgOpen = document.querySelector('.popup-img');
    const cardContainer = document.querySelector('.content__cards');
    cardContainer.prepend(cardElement);
    const cardImage = cardElement.querySelector('.card__img');
    cardImage.addEventListener('click', function(){
        const popupLink = document.querySelector('.popup-img__img');
        const popupName = document.querySelector('.popup-img__text');
        popupLink.src = item.link;
        popupName.textContent = item.name;
        popupAdd(popupImgOpen);
    })
})