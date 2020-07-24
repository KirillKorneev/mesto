import {Card} from './Card.js'; 
import {FormValidator} from './FormValidator.js';

///Функция закрытия окна увеличения фото с удалением слушателя
function closeForm(el) {
    el.classList.remove('popup_open');
    document.removeEventListener('keydown', (evt) => closePhoto(evt, el));
}

///Функция проверки кнопки
function closePhoto(evt, el) {
    if(evt.key === "Escape") {
        closeForm(el);
    }
}

///Функция закрытия/открытия попапа, без отправки
function toggleForm(el) {
    if (el === formElement) {
        inputChangeName.value = profileName.textContent;
        inputChangeJob.value = profileJob.textContent;
    }
    el.classList.toggle('popup_open');
    el.addEventListener('click', function(evt){
        if(evt.target.classList.contains('popup')) {
            toggleForm(el);
        }
    });
    if (el.classList.contains('popup_open')) {
        document.addEventListener('keydown', (evt) => closePhoto(evt, el));
    }
}

///Функция формы добавления новой карточки
function addNewCard(evt) {

    evt.preventDefault();

    const cardValue = {
        name: cardInput.name.value,
        link: cardInput.link.value
    };

    const card = new Card(cardValue.name, cardValue.link, '#tem-element');
    const cardElement = card.generateCards();
    elements.prepend(cardElement);

    toggleForm(formAddCard);
}

///Функция отправки формы
function formSubmitHandler(evt) {

    evt.preventDefault();

    profileName.textContent = inputChangeName.value;
    profileJob.textContent = inputChangeJob.value;

    toggleForm(formElement);
}

///Слушатели формы смены имени и работы
profileEdit.addEventListener('click', () => toggleForm(formElement)); //открытие формы
formChange.addEventListener('submit', formSubmitHandler); //отправка формы
formCloseButton.addEventListener('click', () => toggleForm(formElement)); //закрытие без отправки


///Слушатели формы добавления карточек
profileAddButton.addEventListener('click', () => toggleForm(formAddCard)); //открытие формы 
formAdd.addEventListener('submit', addNewCard); //отправка формы
closeButton.addEventListener('click', () => toggleForm(formAddCard));  //закрытия без отправки 

///Слушатели попапа увеличения фото
buttonClosePhoto.addEventListener('click', () => toggleForm(popupPhoto)); //закрытие попапа на крестик

///Валидация форм
formList.forEach((formElement) => {
    const form = new FormValidator(data, formElement);
    form.enableValidation();
});
 
///Добавление карточек
initialCards.forEach((el) => {
    const card = new Card(el.name, el.link, '#tem-element');
    const cardElement = card.generateCards();
    elements.prepend(cardElement);
});

export {toggleForm}