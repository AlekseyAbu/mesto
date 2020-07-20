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

const cardContainer = document.querySelector('.content__cards');
const saveClose = document.querySelector('.popup__save');

const popupLink = document.querySelector('.popup-img__img');
const popupName = document.querySelector('.popup-img__text');
const popupImgOpen = document.querySelector('.popup-img');

const popupImgCloseButton = document.querySelector('.popup__close-button_img');
const formCardPopup = document.querySelector('.popup__save_card');
const cardName = document.querySelector('.popup__input_cardname');
const link = document.querySelector('.popup__input_link');
const formElementCard = document.querySelector('.popup__form_card');
const cardTemplate = document.querySelector('#card').content;

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

// function popupToggle(popupArg) { //вызов попапа
//     popupArg.classList.toggle('popup_opened'); //с помощью класса, открываем и закрываем попап
// }

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

function formSubmitHandler (evt) {//берем значения из профиля в попап
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

function addCard(item){ //это функция добавления карточки с помощью темплайт тега
    const cardElement = cardTemplate.cloneNode(true); //клонируем шаблон карточки
    const cardLabelLike = cardElement.querySelector('.card__label-like');
    
    cardLabelLike.addEventListener('click', (evt) => deleteLike(evt));

    function deleteLike(evt){
        evt.target.classList.toggle('card__label-like_black');
    }

    const cardBasket =  cardElement.querySelector('.card__basket');
    const cardImage = cardElement.querySelector('.card__img');
    const cardTitle = cardElement.querySelector('.card__title');
    
    cardBasket.addEventListener('click', deleteCard);//обработчик здесь, так как майним карточки
    cardImage.addEventListener('click', function(){
        openPopupZoom(item);
        popupAdd(popupImgOpen);
    })
    
    cardTitle.textContent = item.name; //куда вставляем тайтл
    cardImage.src = item.link; //куда вставляем изображение
    cardImage.alt = item.alt;

    //cardContainer.prepend(cardElement); 
    return cardElement;
}

function renderCard(cardElement, cardContainer){
    cardContainer.prepend(cardElement);
}

initialCards.forEach ((item) =>  {
    const cardElement = addCard(item); 
    renderCard(cardElement, cardContainer);
})//ф-ция обработки массива //обрабатываем через эту функцию

popupImgCloseButton.addEventListener('click',() =>
    popupRemove(popupImgOpen));

function formSubmitHandlerCard(e) {
    e.preventDefault();
    const newCard = { name: cardName.value, link: link.value }
    //addCard(newcard)
    const cardElement = addCard(newCard); 
    renderCard(cardElement, cardContainer);
    popupRemove(popupCard);

    cardName.value = '';
    link.value = '';
}

formElementCard.addEventListener('submit', formSubmitHandlerCard);

//f-on delete

function deleteCard(e) {
    const card = e.target.closest('.card');//получаем родительский элемент, который хотим удалить. Можно было бы curentTagte.parrentElement использовать
    card.remove();
}

//функция открытия попапа с картинкой

function openPopupZoom(item){
    popupLink.src = item.link;
    popupName.textContent = item.name;
}

enableValidation({
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });



