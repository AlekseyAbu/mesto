

export const popup = document.querySelector('.popup_profile');
export const popupOpenButton = document.querySelector('.profile__title-buttom');
export const popupCloseButton = popup.querySelector('.popup__close-button');
export const popupCard = document.querySelector('.popup_card');
export const popupCardOpenButton = document.querySelector('.profile__button');
export const popupCardCloseButton = document.querySelector('.popup__close-button_card');
export const popupStat = document.querySelector('.popup');

export const formElement = document.querySelector('.popup__form');

export const nameInput = document.querySelector('.popup__input_name');
export const jobInput = document.querySelector('.popup__input_description');
export const name = document.querySelector('.profile__title');
export const job = document.querySelector('.profile__subtitle');

export const popupImgOpen = document.querySelector('.popup-img');
export const popupImgCloseButton = document.querySelector('.popup__close-button_img');

export const cardName = document.querySelector('.popup__input_cardname');
export const link = document.querySelector('.popup__input_link');
export const formElementCard = document.querySelector('.popup__form_card');
export const cardContainer = document.querySelector('.content__cards');

export const initialCards = [
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
