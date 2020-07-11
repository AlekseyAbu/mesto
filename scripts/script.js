//объявляем переменные для открытия и закрытия попапа
const popup = document.querySelector('.popup_profile');
const popupOpenButton = document.querySelector('.profile__title-buttom');
const popupCloseButton = popup.querySelector('.popup__close-button');
// popup card
const popupCard = document.querySelector('.popup_card');
const popupCardOpenButton = document.querySelector('.profile__button');
const popupCardCloseButton = document.querySelector('.popup__close-button_card');


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

function popupToggle(popup) { //вызов попапа
    popup.classList.toggle('popup_opened'); //с помощью класса, открываем и закрываем попап
}

popupCardOpenButton.addEventListener('click', () =>
    popupToggle(popupCard));
popupCardCloseButton.addEventListener('click', () =>
    popupToggle(popupCard));

popupOpenButton.addEventListener('click', function(){
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
   
    popupToggle(popup)
} );
popupCloseButton.addEventListener('click', () =>
    popupToggle(popup));

function formSubmitHandler (evt) {//берем значения из профиля в попап
    evt.preventDefault();
    
    name.textContent = nameInput.value
    job.textContent = jobInput.value
    
    popupToggle(popup);
}

formElement.addEventListener('submit', formSubmitHandler);

function addCard(item){ //это функция добавления карточки с помощью темплайт тега
    const cardTemplate = document.querySelector('#card').content; //нашли шаблон карточки в template
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
        popupToggle(popupImgOpen);
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

const formCardPopup = document.querySelector('.popup__save_card');
const cardName = document.querySelector('.popup__input_cardname');
const link = document.querySelector('.popup__input_link');
const formElementCard = document.querySelector('.popup__form_card');

popupImgCloseButton.addEventListener('click',() =>
    popupToggle(popupImgOpen));

function formSubmitHandlerCard(e) {
    e.preventDefault();

    const newName = cardName.value;
    const newLink = link.value;
    const newCard = { name: newName, link: newLink}

    //addCard(newcard)
    const cardElement = addCard(newCard); 
    renderCard(cardElement, cardContainer);
    popupToggle(popupCard);

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
    const linkPopup = item.link;
    const namePopup = item.name;

    popupLink.src = item.link;
    popupName.textContent = item.name;
}



