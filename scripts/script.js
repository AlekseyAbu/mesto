import {FormValidator} from './FormValidator.js';
export {popupAdd, popupRemove};
import {Card} from './Card.js';

const config ={
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible' 
}

const editForm = new FormValidator(config ,'.popup_profile')
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

//const cardContainer = document.querySelector('.content__cards');
const saveClose = document.querySelector('.popup__save');

const popupLink = document.querySelector('.popup-img__img');
const popupName = document.querySelector('.popup-img__text');
const popupImgOpen = document.querySelector('.popup-img');

const popupImgCloseButton = document.querySelector('.popup__close-button_img');
const formCardPopup = document.querySelector('.popup__save_card');
const cardName = document.querySelector('.popup__input_cardname');
const link = document.querySelector('.popup__input_link');
const formElementCard = document.querySelector('.popup__form_card');

const keyHandler = (evt) => {
    const activePopup = document.querySelector('.popup_opened');
    if(evt.keyCode === 27){
        popupRemove(activePopup);
    }
}

function popupAdd(popupArg) {
    popupArg.classList.add('popup_opened');
    document.addEventListener('keydown', keyHandler);
}

function popupRemove(popupArg) {
    popupArg.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
}

popupCardOpenButton.addEventListener('click', () =>
    popupAdd(popupCard));
popupCardCloseButton.addEventListener('click', () =>
    popupRemove(popupCard));

popupOpenButton.addEventListener('click', function(){
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
   
    popupAdd(popup);
} );
popupCloseButton.addEventListener('click', () =>
    popupRemove(popup)
);

function formSubmitHandler (evt) {
    evt.preventDefault();
    
    name.textContent = nameInput.value
    job.textContent = jobInput.value
    
    popupRemove(popup);
}

const closePopupOverlay = (evt) => {
    if (evt.target !== evt.currentTarget){
        return
    }
    popupRemove(evt.currentTarget)
}

popupStat.addEventListener('click', closePopupOverlay);
popupImgOpen.addEventListener('click', closePopupOverlay);
popupCard.addEventListener('click', closePopupOverlay);

formElement.addEventListener('submit', formSubmitHandler);

popupImgCloseButton.addEventListener('click',() =>
    popupRemove(popupImgOpen));

function formSubmitHandlerCard(e) {
    e.preventDefault();
    const newCard = { name: cardName.value, link: link.value, alt: cardName.value }
    const card = new Card(newCard, '.card');
    const cardElement = card.generedCard();
    const cardImage = cardElement.querySelector('.card__img');
    cardImage.addEventListener('click', function(){
        openPopupZoom(item);
        popupAdd(popupImgOpen);
    })

    const cardContainer = document.querySelector('.content__cards');
    cardContainer.prepend(cardElement);
    popupRemove(popupCard);

    cardName.value = '';
    link.value = '';
}

function openPopupZoom(item){
    popupLink.src = item.link;
    popupName.textContent = item.name;
}

formElementCard.addEventListener('submit', formSubmitHandlerCard);




