import {Card} from '../components/Card.js'; 
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js'
import {profileJob, profileName, inputChangeName, inputChangeJob, profileEdit, profileAddButton, formList,
        data, initialCards, elements, cardInput, formChangeInfo, formAdd, formElement, formAddCard} from '../utils/constants.js';
//import avatarImg from '../../images/avatar.jpg';
//import '../../pages/index.css';

///Валидация форм
formList.forEach((formElement) => {
    const form = new FormValidator(data, formElement);
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
    let currentData = popupInfoCurrent.getUserInfo();
    inputChangeName.value = currentData.name;
    inputChangeJob.value = currentData.job;
    popupInfoForm.open();
});

///Увеличенное фото
const popupZoomPhoto = new PopupWithImage('.popup_photo');
popupZoomPhoto.setEventListeners();

///Слушатели формы добавления карточек
const popupNewCardForm = new PopupWithForm('.popup_new', () => {
    const cardValue = {
        name: cardInput.name.value,
        link: cardInput.link.value
    };
    const card = new Card(cardValue.name, cardValue.link, () => {
        popupZoomPhoto.open(cardValue.name, cardValue.link);
    } ,'#tem-element');
    const cardElement = card.generateCards();
    elements.prepend(cardElement);
});

popupNewCardForm.setEventListeners();

profileAddButton.addEventListener('click', () => {
    const formAddNewCard = new FormValidator(data, formAddCard);
    formAddNewCard.enableValidation();
    popupNewCardForm.open();
}); 

///Первые карточки
const cards = new Section({
    items: initialCards,
    renderer: (el) => {
        const card = new Card(el.name, el.link, () => {
            popupZoomPhoto.open(el.name, el.link);
        } ,'#tem-element');
        const cardElement = card.generateCards();
        cards.addItem(cardElement);
    }
}, '.elements');

cards.renderItems();

