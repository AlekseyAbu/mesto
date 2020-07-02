let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__title-buttom');
let popupCloseButton = popup.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_description');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');


function popupToggle() {

    if (!popup.classList.contains('popup_opened')) { //то что нужно?
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } 

    popup.classList.toggle('popup_opened');

}


popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);



let saveClose = document.querySelector('.popup__save');

function formSubmitHandler (evt) {
    evt.preventDefault();
    

    name.textContent = nameInput.value
    job.textContent = jobInput.value
    
    saveClose.addEventListener('click', popupToggle);
}



formElement.addEventListener('submit', formSubmitHandler);
