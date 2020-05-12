// Находим форму в DOM
let formElement = document.querySelector('.pop'); //вся форма
let profileEdit = document.querySelector('.profile__edit'); //кнопка редактирования
let formCloseButton = formElement.querySelector('.edit__close'); //кнопка закрытие формы
let profileName = document.querySelector('.profile__name'); //имя в профиле
let profileJob = document.querySelector('.profile__about');  //подпись в профиле
let nameInput = formElement.querySelector('.form__input_el_name'); //имя в форме
let jobInput = formElement.querySelector('.form__input_el_spec'); //подпись в форме
let formButton = formElement.querySelector('.form__button'); //кнопка сохранить


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
}

function formOpenClose() {
    formElement.classList.toggle('pop_open');
}

function formChange() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    formOpenClose();
}


profileEdit.addEventListener('click', formOpenClose);

nameInput.setAttribute("value", profileName.textContent);
jobInput.setAttribute("value", profileJob.textContent);

formElement.addEventListener('submit', formSubmitHandler);

formCloseButton.addEventListener('click', formOpenClose);
formButton.addEventListener('click', formChange);
