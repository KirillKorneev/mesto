import {Card} from '../components/Card.js'; 
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {profileJob, profileName, inputChangeName, inputChangeJob, profileEdit, profileAddButton, formList,
        formInfo, initialCards, elements, cardInput, formChangeInfo, formAdd, formElement, formAddCard, addButton} from '../utils/constants.js';
//import avatarImg from '../images/avatar.jpg';
//import '../pages/index.css';

///Абсолютно пустая секция
const cards = new Section({ 
    items: null,
    renderer: null
}, '.elements');


const api = new Api({
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort-14', 
    headers: {
        'Content-Type': 'application/json',
        'authorization': '42b45684-18cf-461b-be7b-02246c8d8e0d'
    }
})

///Валидация форм
formList.forEach((formElement) => {
    const form = new FormValidator(formInfo, formElement);
    form.enableValidation();
});

///Установка начальных значений профиля
api.getUserInformation('users/me').then(res => {
    profileJob.textContent = res.about;
    profileName.textContent = res.name;
});

///Слушатели формы смены имени и работы
const popupInfoCurrent = new UserInfo({
    userInfo: profileJob,
    userName: profileName
});

const popupInfoForm = new PopupWithForm('.popup_info', (inputList) => {
    api.profileEding('users/me', inputList.inputChangeName, inputList.inputChangeJob)
    .then(res => {
        popupInfoCurrent.setUserInfo({
            name: res.name, 
            job: res.about
        });
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

///Добавление карточек, которые есть в массиве 
api.getItems('cards').then(res => {
    const cards = new Section({
        items: res,
        renderer: (res) => {
            const card = new Card(res.name, res.link, () => {
                popupZoomPhoto.open(res.name, res.link);
            } ,'#tem-element');
            const cardElement = card.generateCards();
            cards.addItem(cardElement);
        }
    }, '.elements');
    cards.renderItems();
});

///Слушатели формы добавления карточек
const popupNewCardForm = new PopupWithForm('.popup_new', () => {
    const cardValue = {
        name: cardInput.name.value,
        link: cardInput.link.value
    };
    api.createItem('cards', cardValue.name, cardValue.link).then(res => {
        const card = new Card(res.name, res.link, () => {
            popupZoomPhoto.open(res.name, res.link);
        } ,'#tem-element');
        const cardElement = card.generateCards();
        cards.addItem(cardElement);
    });
});

popupNewCardForm.setEventListeners();

