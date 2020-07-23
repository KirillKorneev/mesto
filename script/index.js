import {Card} from './Card.js'; 
import {FormValidator} from './FormValidator.js';

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
for (let i = 0; i < initialCards.length; i++) {
    const card = new Card(initialCards[i].name, initialCards[i].link, '#tem-element');
    const cardElement = card.generateCards();
    elements.prepend(cardElement);
}
