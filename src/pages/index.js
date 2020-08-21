import {Card} from '../components/Card.js'; 
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js'
import {profileJob, profileName, inputChangeName, inputChangeJob, profileEdit, profileAddButton, formList,
        formInfo, initialCards, elements, cardInput, formChangeInfo, formAdd, formElement, formAddCard, addButton} from '../utils/constants.js';
import avatarImg from '../images/avatar.jpg';
import '../pages/index.css';

///Валидация форм
formList.forEach((formElement) => {
    const form = new FormValidator(formInfo, formElement);
    form.enableValidation();
});

///Слушатели формы смены имени и работы
const popupInfoCurrent = new UserInfo({
    userInfo: profileJob,
    userName: profileName
});

const popupInfoForm = new PopupWithForm('.popup_info', (inputList) => {
    popupInfoCurrent.setUserInfo({
        name: inputList.inputChangeName, 
        job: inputList.inputChangeJob
    });
});

popupInfoForm.setEventListeners();

profileEdit.addEventListener('click', () => {
    const currentData = popupInfoCurrent.getUserInfo();
    inputChangeName.value = currentData.name;
    inputChangeJob.value = currentData.job;
    popupInfoForm.open();
});

///Увеличенное фото
const popupZoomPhoto = new PopupWithImage('.popup_photo');
popupZoomPhoto.setEventListeners();

profileAddButton.addEventListener('click', () => {
    addButton.disabled = 'true';
    addButton.classList.add('form__button_inactive');
    popupNewCardForm.open();
}); 

function generationCard(name, link) {
    const card = new Card(name, link, () => {
        popupZoomPhoto.open(name, link);
    } ,'#tem-element');
    const cardElement = card.generateCards();
    cards.addItem(cardElement);
}

///Первые карточки
const cards = new Section({
    items: initialCards,
    renderer: (el) => {
        generationCard(el.name, el.link);
    }
}, '.elements');

///Слушатели формы добавления карточек
const popupNewCardForm = new PopupWithForm('.popup_new', () => {
    const cardValue = {
        name: cardInput.name.value,
        link: cardInput.link.value
    };
    generationCard(cardValue.name, cardValue.link);
});

popupNewCardForm.setEventListeners();

cards.renderItems();

