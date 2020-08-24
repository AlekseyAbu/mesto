

export class Card {
    constructor({data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)//я же тут темплайт шаблон ищу, а не селектор класса.
            .content
            .querySelector('.card')//возможно ошибку для этой строки
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
        this._setEventListener();

        return this._element;
    }

    _deleteLike() {
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
        this._element.querySelector('.card__basket').addEventListener('click', () => {
            this._deleteCard();
        });
    }

    _setEventListener() {
        this._element.querySelector('.card__img').addEventListener('click', () => this._handleCardClick());
    }
}
