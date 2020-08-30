

export class Card {
    constructor({ data, userIdme, handleCardClick, handleLikeClick, handleDislikeClick, handleDeleteClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._idCreatorCard = data.owner._id
        this._handleDislikeClick = handleDislikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._userID = userIdme;
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
        this._likeContainer = this._element.querySelector('.card__number-like');
        this._element.querySelector('.card__title').textContent = this._name;
        const cardImg = this._element.querySelector('.card__img');
        cardImg.src = this._link;
        cardImg.alt = this._link;
        this._setEventListener();
        this.renderLikes();
        if (this._idCreatorCard === this._userID) {
            this._element.querySelector('.card__basket').classList.add('card__basket_active');
        }

        return this._element;
    }

    deleteCard() {
        this._element.closest('.card').remove();
        this._element = null;
    }

    _setEventListener() {
        this._element.querySelector('.card__img').addEventListener('click', () => this._handleCardClick());
        this._element.querySelector('.card__basket').addEventListener('click', () => this._handleDeleteClick(this._id));
        this._element.querySelector('.card__label-like').addEventListener('click', () => {
            if(this._element.querySelector('.card__label-like').classList.contains('card__label-like_black')) {
                this._handleDislikeClick(this._id)
            }
            else{
                this._handleLikeClick(this._id)
            }
        });
    }

    _likeColor() {
        return this._element.querySelector('.card__label-like').classList.contains('card__label-like_black')
    }

    updateLikes(likes) {
        this._likes = likes;
        this.renderLikes();
    }

    renderLikes() {
        this._likeContainer.textContent = this._likes.length;
        if (this._isLiked()) {
            this._element.querySelector('.card__label-like').classList.add('card__label-like_black');
        }
        else {
            this._element.querySelector('.card__label-like').classList.remove('card__label-like_black');
        }

    }

    _isLiked() {
        return this._likes.some( (item) => {
            return item._id === this._userID;
        })
    }
}
