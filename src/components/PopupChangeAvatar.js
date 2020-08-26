import {Popup} from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';

export class PopupChangeAvatar extends PopupWithForm {
    constructor(selector, handleFormSubmit) {
        super(selector, handleFormSubmit);
    }

    setEventListeners() {
        super.setEventListeners();
    }
}