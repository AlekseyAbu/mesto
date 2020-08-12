export {keyHandler, popupAdd, popupRemove};

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