import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
// import { openPopup, closePopup } from '../../utils/utils.js';
import { popup, popupOpenButton, popupCloseButton, popupCard, popupCardOpenButton, popupCardCloseButton, popupStat, formElement, nameInput, jobInput, name, job, popupImgOpen, popupImgCloseButton, cardName, link, formElementCard, cardContainer, initialCards } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
// import { PopupWithForm } from '../../components/PopupWithForm';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


const config = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const editForm = new FormValidator(config, '.popup_profile');
const addCardForm = new FormValidator(config, '.popup_card');

editForm.enableValidation();
addCardForm.enableValidation();


const openPopupImg = new PopupWithImage('.popup-img');

////// Открытие попапа с картинкой
const popupFormCard = new PopupWithForm('.popup_card', {
    submitForm: (item) => {
        console.log(item)
        const card = new Card(
            {
                data: item,
                handleCardClick: () => {
                    openPopupImg.open(item);
                    openPopupImg.setEventListeners();
                }
            },
            '.card');
        const cardElement = card.generedCard();

        cardList.addItem(cardElement);
        popupFormCard.close();
    }
});
popupFormCard.setEventListeners();

popupCardOpenButton.addEventListener('click', () => {
    popupFormCard.open();
})

///// Открытие попапа с данными профиля
const userInfoProfile = new UserInfo ({
    name: name,
    job: job
})

popupOpenButton.addEventListener('click', () => {
    const userItems = userInfoProfile.getUserInfo();
    nameInput.value = userItems.name;
    jobInput.value = userItems.job;
    popupFormProfile.open();
})

const popupFormProfile = new PopupWithForm('.popup_profile', 
{
    submitForm: (item) => {
        userInfoProfile.setUserInfo(item)
        popupFormProfile.close();
    }
})

popupFormProfile.setEventListeners();

//// генерим карточки для страницы
const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(
            {
                data: cardItem,
                handleCardClick: () => {
                    openPopupImg.open(cardItem);
                    openPopupImg.setEventListeners();
                }
            },
            '.card');
        const cardElement = card.generedCard();

        cardList.addItem(cardElement);
    }
},
    cardContainer);

cardList.renderItems();

openPopupImg.setEventListeners();



