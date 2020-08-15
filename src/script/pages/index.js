import {Card} from '../components/Card.js'; 
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js'
import {profileJob, profileName, inputChangeName, inputChangeJob, profileEdit, profileAddButton, formList,
        data, initialCards, elements, cardInput, formChangeInfo, formAdd} from '../utils/constants.js';
//import avatarImg from '../../images/avatar.jpg';
//import '../../pages/index.css';

let currentData;
///Слушатели формы смены имени и работы
const popupInfo = new Popup('.popup_info')
const popupInfoCurrent = new UserInfo({
    userInfo: profileJob,
    userName: profileName
});

const popupInfoForm = new PopupWithForm('.popup_info', (inputList) => {
    console.log(inputList.inputChangeName);
    console.log(inputList.inputChangeJob);
    //profileName.textContent = inputList.inputChangeName;
    //profileJob.textContent = inputList.inputChangeJob;
    popupInfoCurrent.setUserInfo({
        name: inputList.inputChangeName, 
        job: inputList.inputChangeJob
    });
});

profileEdit.addEventListener('click', () => {
    currentData = popupInfoCurrent.getUserInfo();
    console.log(currentData);
    inputChangeName.value = currentData.name;
    inputChangeJob.value = currentData.job;
    popupInfo.open();
});


formChangeInfo.addEventListener('submit', () => {
    popupInfoForm.setEventListeners();
}); 

///Увеличенное фото
const popupZoomPhoto = new PopupWithImage('.popup_photo');



///Слушатели формы добавления карточек
//const popupNewCard = new Popup('.popup_new');

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

profileAddButton.addEventListener('click', () => {
    popupNewCardForm.open();
}); 

formAdd.addEventListener('submit', () => {
    popupNewCardForm.setEventListeners();
}); 

///Валидация форм
formList.forEach((formElement) => {
    const form = new FormValidator(data, formElement);
    form.enableValidation();
});




///Первые карточки
const cards = new Section({
    items: initialCards,
    renderer: (el) => {
        const card = new Card(el.name, el.link, () => {
            popupZoomPhoto.open(el.name, el.link);
        } ,'#tem-element');
        const cardElement = card.generateCards();
        elements.prepend(cardElement);
    }
}, '.elements');

cards.renderItems();

