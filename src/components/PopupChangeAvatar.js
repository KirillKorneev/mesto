import {PopupWithForm} from './PopupWithForm.js';

export class PopupChangeAvatar extends PopupWithForm {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._sumbitPopup = handleFormSubmit;
    }
}