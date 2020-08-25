import {Popup} from './Popup.js';

export class PopupAgreement extends Popup {
    constructor(selector, formSubmitHandler) {
        super(selector);
        this._sumbitPopup = formSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._sumbitPopup();
            this.close();
        });
    }
}