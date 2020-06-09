///Функция проверки валидации всех инпутов
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

///Функция активации кнопки
function toggleButtonState(inputList, buttonElement, object) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
  }
};

///Функция показа ошибки
function showInputError(formElement, inputElement, errorMessage, object) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
}

///Функция скрытия ошибки
function hideInputError(formElement, inputElement, object) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.textContent = '';
}

///Функция проверки валидации
function checkInputValidity(formElement, inputElement, object) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }
}

///Функция вставки слушателей
function setEventListeners(formElement, object) {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  if (buttonElement.classList.contains('form__button_new')) {
    toggleButtonState(inputList, buttonElement, object);
  }
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
}

///Функция сбора всех форм
function enableValidation(object) {
  let formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    });    
    setEventListeners(formElement, object);
  });
}
  

