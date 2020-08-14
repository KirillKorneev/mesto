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
            console.log(item.name);
            inputValues[item.name] = item.value;
        });
        return inputValues;
    }

    _close() {
        const inputArray = Array.from(this._popupElement.querySelectorAll('.form__input'));
        if (!this._popupElement.classList.contains('popup_info')) {
            inputArray.forEach((item) => {
                item.value = '';
            });
        }
        super.close();
    }

    setEventListeners() {
        super._setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._sumbitPopup((this._getInputValues()));
          this._close();
        });
      }
}