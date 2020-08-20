import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(name, link) {
        this._popupElement.querySelector('.pop-image__image').src = link;
        this._popupElement.querySelector('.pop-image__about').textContent = name;
        this._popupElement.querySelector('.pop-image__image').alt = name;
        super.open();
    }
}