// Находим форму в DOM
let formElement = document.querySelector('.popup'); //попап
let form = document.querySelector('.form'); //форма
let profileEdit = document.querySelector('.profile__edit'); //кнопка редактирования
let formCloseButton = formElement.querySelector('.popup__close'); //кнопка закрытие формы
let profileName = document.querySelector('.profile__name'); //имя в профиле
let profileJob = document.querySelector('.profile__about');  //подпись в профиле
let nameInput = formElement.querySelector('.form__input_el_name'); //имя в форме
let jobInput = formElement.querySelector('.form__input_el_spec'); //подпись в форме
let formButton = formElement.querySelector('.form__button'); //кнопка сохранить
let textName = profileName.textContent;
let textJob = profileJob.textContent;

//Честно, мне максимально непонятно, как вставлять в инпут значение через textcontent
//Почему не подходить решение с value

///Функция закрытия формы, с отправкой
function formOpenClose() {
    nameInput.setAttribute("value", textName);
    jobInput.setAttribute("value", textJob);
    formElement.classList.toggle('popup_close');
}

///Функция закрытия формы, без отправки
function formClose() {
    formElement.classList.toggle('popup_close');
}


///Функция отправки формы
function formSubmitHandler (evt) {

    evt.preventDefault();
    let valueName = nameInput.value;
    let valueJob = jobInput.value;
    profileName.textContent = valueName;
    profileJob.textContent = valueJob;
    
    formClose(); 
}



profileEdit.addEventListener('click', formOpenClose); ///открытие формы

form.addEventListener('submit', formSubmitHandler); ///отправка формы

formCloseButton.addEventListener('click', formClose); ///закрытие без отправки
