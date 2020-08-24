
export class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }
    
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this._popupElement.classList.remove('popup_opened');
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target !== evt.currentTarget) {
            return
        }
        this.close(evt.currentTarget);
    }

    setEventListeners() {
        const popupClose = this._popupElement.querySelector('.popup__close-button')
        popupClose.addEventListener('click', () => {
            this.close();
        })
        this._popupElement.addEventListener('click', (evt) => this._handleOverlayClose(evt));
    }
}