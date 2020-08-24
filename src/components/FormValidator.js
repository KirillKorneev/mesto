class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }


  ///Функция проверки валидации всех инпутов
  _hasInvalidInput(_inputList) {
    return _inputList.some((_inputElement) => {
      return !_inputElement.validity.valid;
    })
  };

  ///Функция активации кнопки
  _toggleButtonState(_inputList, _buttonElement) {
    if (this._hasInvalidInput(_inputList)) {
      _buttonElement.disabled = 'true';
      _buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      _buttonElement.removeAttribute('disabled');
      _buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  ///Функция показа ошибки
  _showInputError(_inputElement, _errorMessage) {
    const errorElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
    _inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = _errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  ///Функция скрытия ошибки
  _hideInputError(_inputElement) {
    const errorElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
    _inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  ///Функция проверки валидации
  _checkInputValidity(_inputElement) {
    if (!_inputElement.validity.valid) {
      this._showInputError(_inputElement, _inputElement.validationMessage);
    } else {
      this._hideInputError(_inputElement);
    }
  }
  
  ///Функция вставки слушателей
  _setEventListeners() {
    const _inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const _buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    if (_buttonElement.classList.contains('form__button_new')) {
      this._toggleButtonState(_inputList, _buttonElement);
    }

    _inputList.forEach((_inputElement) => {
      _inputElement.addEventListener('input', () => 
        this._checkInputValidity(_inputElement)
      );
    });
    
    _inputList.forEach((_inputElement) => {
      _inputElement.addEventListener('input', () => 
        this._toggleButtonState(_inputList, _buttonElement)
      );
    });
  }

  ///Функция сбора всех форм
  enableValidation() { 
    this._formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    });   
    this._setEventListeners();
  }
}

export {FormValidator};