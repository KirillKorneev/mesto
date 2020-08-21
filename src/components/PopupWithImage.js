import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(name, link) {
        const popupImage = this._popupElement.querySelector('.pop-image__image');
        popupImage.src = link;
        this._popupElement.querySelector('.pop-image__about').textContent = name;
        popupImage.alt = name;
        super.open();
    }
}