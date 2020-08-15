import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, formSubmitHandler) {
        super(selector);
        this._sumbitPopup = formSubmitHandler;
        this._inputValues = {};
    }

    _getInputValues() {
        const inputArray = Array.from(this._popupElement.querySelectorAll('.form__input'));
        const inputValues = {};
        inputArray.forEach((item) => {
            inputValues[item.name] = item.value;
        });
        return inputValues;
    }

    close() {
        const inputArray = Array.from(this._popupElement.querySelectorAll('.form__input'));
        inputArray.forEach((item) => {
            item.value = '';
        });
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._sumbitPopup(this._getInputValues());
          console.log(this._getInputValues());
          this.close();
        });
    }
}