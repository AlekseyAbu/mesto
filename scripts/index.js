import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { openPopup, closePopup } from './utils.js';

const config = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const editForm = new FormValidator(config, '.popup_profile')
const addCardForm = new FormValidator(config, '.popup_card')

editForm.enableValidation();
addCardForm.enableValidation();

//объявляем переменные для открытия и закрытия попапа
const popup = document.querySelector('.popup_profile');
const popupOpenButton = document.querySelector('.profile__title-buttom');
const popupCloseButton = popup.querySelector('.popup__close-button');
// popup card
const popupCard = document.querySelector('.popup_card');
const popupCardOpenButton = document.querySelector('.profile__button');
const popupCardCloseButton = document.querySelector('.popup__close-button_card');
const popupStat = document.querySelector('.popup');

const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

// const saveClose = document.querySelector('.popup__save');
// const popupLink = document.querySelector('.popup-img__img');
// const popupName = document.querySelector('.popup-img__text');
const popupImgOpen = document.querySelector('.popup-img');
const popupImgCloseButton = document.querySelector('.popup__close-button_img');
// const formCardPopup = document.querySelector('.popup__save_card');
const cardName = document.querySelector('.popup__input_cardname');
const link = document.querySelector('.popup__input_link');
const formElementCard = document.querySelector('.popup__form_card');
const cardContainer = document.querySelector('.content__cards');



popupCardOpenButton.addEventListener('click', () => {
    openPopup(popupCard);
    addCardForm.resetForm();
});
popupCardCloseButton.addEventListener('click', () =>
    closePopup(popupCard));

popupOpenButton.addEventListener('click', function () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;

    openPopup(popup);
});
popupCloseButton.addEventListener('click', () =>
    closePopup(popup)
);

function formSubmitHandler(evt) {
    evt.preventDefault();

    name.textContent = nameInput.value
    job.textContent = jobInput.value

    closePopup(popup);
}

const closePopupOverlay = (evt) => {
    if (evt.target !== evt.currentTarget) {
        return
    }
    closePopup(evt.currentTarget)
}

popupStat.addEventListener('click', closePopupOverlay);
popupImgOpen.addEventListener('click', closePopupOverlay);
popupCard.addEventListener('click', closePopupOverlay);

formElement.addEventListener('submit', formSubmitHandler);

popupImgCloseButton.addEventListener('click', () =>
    closePopup(popupImgOpen));

function formSubmitHandlerCard(e) {
    e.preventDefault();
    const newCard = { name: cardName.value, link: link.value, alt: cardName.value }
    const card = new Card(newCard, '.card');
    const cardElement = card.generedCard();

    cardContainer.prepend(cardElement);
    closePopup(popupCard);

    addCardForm.resetForm();
    cardName.value = '';
    link.value = '';
}

formElementCard.addEventListener('submit', formSubmitHandlerCard);

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



initialCards.forEach((item) => {
    const card = new Card(item, '.card');
    const cardElement = card.generedCard();

    cardContainer.prepend(cardElement);
})


