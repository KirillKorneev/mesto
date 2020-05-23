const formElement = document.querySelector('.popup'); //попап
const form = document.querySelector('.form'); //форма
const profileEdit = document.querySelector('.profile__edit'); //кнопка редактирования
const formCloseButton = formElement.querySelector('.popup__close'); //кнопка закрытие формы
const profileName = document.querySelector('.profile__name'); //имя в профиле
const profileJob = document.querySelector('.profile__about');  //подпись в профиле
const nameInput = formElement.querySelector('.form__input_el_name'); //имя в форме
const jobInput = formElement.querySelector('.form__input_el_spec'); //подпись в форме
const formButton = formElement.querySelector('.form__button'); //кнопка сохранить

//Честно, мне максимально непонятно, как вставлять в инпут значение через textcontent
//Почему не подходить решение с value

///Функция открытия формы
function formOpenClose() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formElement.classList.toggle('popup_close');
}

///Функция закрытия формы, без отправки
function formClose() {
    formElement.classList.toggle('popup_close');
}


///Функция отправки формы
function formSubmitHandler (evt) {

    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    formClose();

}

profileEdit.addEventListener('click', formOpenClose); ///открытие формы

form.addEventListener('submit', formSubmitHandler); ///отправка формы

formCloseButton.addEventListener('click', formClose); ///закрытие без отправки
