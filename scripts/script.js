let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__title-buttom');
let popupCloseButton = popup.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_description');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

const cardContainer = document.querySelector('.content__cards');


function popupToggle() { //вызов попапа

    if (!popup.classList.contains('popup_opened')) { 
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } 

    popup.classList.toggle('popup_opened'); //с помощью класса, открываем и закрываем попап

}




popupOpenButton.addEventListener('click', popupToggle );


popupCloseButton.addEventListener('click', popupToggle);

popupCloseButton.insertAdjacentHTML



let saveClose = document.querySelector('.popup__save');

function formSubmitHandler (evt) {//берем значения из профиля в попап
    evt.preventDefault();
    

    name.textContent = nameInput.value
    job.textContent = jobInput.value
    
    popupToggle();
}



formElement.addEventListener('submit', formSubmitHandler);

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

function addCard(item){ //это функция добавления карточки с помощью темплайт тега
    const cardTemplate = document.querySelector('#card').content; //нашли шаблон карточки в template
    const cardElement = cardTemplate.cloneNode('true'); //клонируем шаблон карточки
    
    cardElement.querySelector('.card__title').textContent = item.name; //куда вставляем тайтл
    cardElement.querySelector('.card__img').src = item.link; //куда вставляем изображение

    console.log(item.name)
    console.log(item.link)

    cardContainer.append(cardElement);
}

initialCards.forEach (function(item) { //ф-ция обработки массива 
    addCard(item) //обрабатываем через эту функцию
})


