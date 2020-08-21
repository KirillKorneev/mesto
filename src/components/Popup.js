import {inputChangeName, inputChangeJob, profileName, profileJob} from '../utils/constants.js';

export class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
    }

    _handleEscClose(evt) {
        if(evt.key === "Escape") {
            this.close();
        }
    }

    close() {
        this._popupElement.classList.remove('popup_open');
        document.removeEventListener('keydown', (evt) => this._handleEscClose());
    }

    setEventListeners() {
        this._popupElement
        .querySelector('.popup__close')
        .addEventListener('click', () => {
            this.close();
        }); 
        this._popupElement.addEventListener('click', function(evt){
            if(evt.target.classList.contains('popup')) {
                this.classList.remove('popup_open');
            }
        });
    }

    open() {
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        this._popupElement.classList.add('popup_open');
    }
}
