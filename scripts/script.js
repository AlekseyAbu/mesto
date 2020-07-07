//объявляем переменные для открытия и закрытия попапа
let popup = document.querySelector('.popup_profile');
let popupOpenButton = document.querySelector('.profile__title-buttom');
let popupCloseButton = popup.querySelector('.popup__close-button');
// popup card
const popupCard = document.querySelector('.popup_card');
const popupCardOpenButton = document.querySelector('.profile__button');
const popupCardCloseButton = document.querySelector('.popup__close-button_card');


let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_description');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

const cardContainer = document.querySelector('.content__cards');
let saveClose = document.querySelector('.popup__save');

const popupLink = document.querySelector('.popup-img__img');
const popupName = document.querySelector('.popup-img__text');
const popupImgClose = document.querySelector('.popup-img__close');
const popupImgOpen = document.querySelector('.popup-img');

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
    console.log('privet')
}


popupCardOpenButton.addEventListener('click', function() {
    popupToggle(popupCard)
});
popupCardCloseButton.addEventListener('click', function() {
    popupToggle(popupCard)
});


//
popupOpenButton.addEventListener('click', function(){

    if (!popup.classList.contains('popup_opened')) { //проверяем, есть ли класс у попапа. Если нет, то переносим значения из профился
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } 
    popupToggle(popup)
} );
popupCloseButton.addEventListener('click', function(){
    popupToggle(popup)
    
});

popupCloseButton.insertAdjacentHTML

function formSubmitHandler (evt) {//берем значения из профиля в попап
    evt.preventDefault();
    

    name.textContent = nameInput.value
    job.textContent = jobInput.value
    
    popupToggle(popup);
}

formElement.addEventListener('submit', formSubmitHandler);


function addCard(item){ //это функция добавления карточки с помощью темплайт тега
    const cardTemplate = document.querySelector('#card').content; //нашли шаблон карточки в template
    const cardElement = cardTemplate.cloneNode('true'); //клонируем шаблон карточки
    
    cardElement.querySelector('.card__label-like').addEventListener('click', function(evt){
        evt.target.classList.toggle('card__label-like_black');
    });
    
    cardElement.querySelector('.card__basket').addEventListener('click', deleteCard);//обработчик здесь, так как майним карточки
    cardElement.querySelector('.card__img').addEventListener('click', function(){
        popupZoom(item);
        console.log('privet')
        popupToggle(popupImgOpen);
    })
    

    cardElement.querySelector('.card__title').textContent = item.name; //куда вставляем тайтл
    cardElement.querySelector('.card__img').src = item.link; //куда вставляем изображение

    console.log(item.name)
    console.log(item.link)

    cardContainer.prepend(cardElement);

    
}

initialCards.forEach (function(item) { //ф-ция обработки массива 
    addCard(item) //обрабатываем через эту функцию
})

document.querySelector('.popup-img__close').addEventListener('click',function(){
    popupToggle(popupImgOpen);
    console.log(popupImgOpen);
})


const formCardPopup = document.querySelector('.popup__save_card');
const cardname = document.querySelector('.popup__input_cardname');
const link = document.querySelector('.popup__input_link');
const formElementCard = document.querySelector('.popup__form_card');

console.log(formElementCard)

function formSubmitHandlerCard(e) {
    e.preventDefault();

    const newname = cardname.value;
    const newlink = link.value;
    const newcard = { name: newname, link: newlink}

    addCard(newcard)
    popupToggle(popupCard);

    cardname.value = '';
    link.value = '';
}

formElementCard.addEventListener('submit', formSubmitHandlerCard);

//f-on delete

function deleteCard(e) {
    const card = e.target.closest('.card');//получаем родительский элемент, который хотим удалить. Можно было бы curentTagte.parrentElement использовать

    card.remove();
}

//функция открытия попапа с картинкой

function popupZoom(item){
    const linkPopup = item.link;
    const namePopup = item.name;

    popupLink.src = item.link;
    popupName.textContent = item.name;
}



