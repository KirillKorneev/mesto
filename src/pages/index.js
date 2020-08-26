import {Card} from '../components/Card.js'; 
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupChangeAvatar} from '../components/PopupChangeAvatar.js';
import {PopupAgreement} from '../components/PopupAgreement.js';
import {Api} from '../components/Api.js';
import {profileJob, profileName, inputChangeName, inputChangeJob, profileEdit, profileAddButton, formList,
        formInfo, initialCards, elements, cardInput, formChangeInfo, formAdd, formElement, formAddCard, addButton,
        profileChangeAvatarButton, changeAvatarButton, profilePhoto, popupUpdatePhoto, popupDeleteAgree} from '../utils/constants.js';
import avatarImg from '../images/avatar.jpg';
import '../pages/index.css';

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

///Попап удаления карточки
const popupDeleteCard = new PopupAgreement('.popup_agreement', () => {});
popupDeleteCard.setEventListeners();

///Валидация форм
formList.forEach((formElement) => {
    const form = new FormValidator(formInfo, formElement);
    form.enableValidation();
});

///Установка начальных значений страницы
Promise.all([
    api.getUserInformation('users/me'),
    api.getItems('cards')
])
.then((res) => {
    const [userInfo, firstCards] = res;
    profileJob.textContent = userInfo.about;
    profileName.textContent = userInfo.name;
    profilePhoto.style = `background-image: url(${userInfo.avatar});`;
    const userId = userInfo._id;
    const cards = new Section({
        items: firstCards,
        renderer: (firstCards) => {
            const cardId = firstCards._id;
            generateCard(cardId, firstCards, userId);
        }
    }, '.elements');
    cards.renderItems();
})
.catch((err) => {
    console.log(`Ошибка ${err}`);
});

function renderLoading(element, isLoading, loadingText, usualText) {
    if (isLoading) {
        element.querySelector('.form__button').textContent = loadingText;
    }
    else {
        element.querySelector('.form__button').textContent = usualText;
    }
}

function generateCard(cardId, res, userId) {
    const card = new Card({
        cardName: res.name, 
        cardLink: res.link,
        handleCardClick: () => {
            popupZoomPhoto.open(res.name, res.link);
        },
        handleLikeClick: () => {
            if(!cardElement.querySelector('.element__like').classList.contains('element__like_black')) {
                api.putLike('cards/likes', cardId);
                cardElement.querySelector('.element__counter').textContent = res.likes.length + 1;
            }
            else {
                api.removeLike('cards/likes', cardId);
                cardElement.querySelector('.element__counter').textContent = res.likes.length - 1;
            }
        },
        handleDeleteIconClick: () => {
            popupDeleteCard.setSubmitAction(_ => {
                renderLoading(popupDeleteAgree, true, 'Удаление...', 'Удалить');
                api.deleteItem('cards', cardId)
                .then(res => {
                    card.removeCard();
                })
                .catch(err => console.log(`Ошибка ${err}`))
                .finally(() => {
                    renderLoading(popupDeleteAgree, false, 'Удаление...', 'Удалить');
                });
            })
            popupDeleteCard.open();
        }
    }, '#tem-element');
    const cardElement = card.generateCards();
    if(!card.getView(userId, res.owner._id)) {
        cardElement.querySelector('.element__delete').remove();
    }
    for(let i = 0; i < res.likes.length; i++) {
        if (res.likes[i]._id === userId) {
            cardElement.querySelector('.element__like').classList.toggle('element__like_black');
        }
    }
    cardElement.querySelector('.element__counter').textContent = res.likes.length;
    cards.addItem(cardElement);
}

///Слушатели формы смены имени и работы
const popupInfoCurrent = new UserInfo({
    userInfo: profileJob,
    userName: profileName
});

const popupInfoForm = new PopupWithForm('.popup_info', (inputList) => {
    renderLoading(formElement, true, 'Сохранение...', 'Сохранить');
    api.profileEding('users/me', inputList.inputChangeName, inputList.inputChangeJob)
    .then(res => {
        popupInfoCurrent.setUserInfo({
            name: res.name, 
            job: res.about
        });
    })
    .finally(() => {
        renderLoading(formElement, false, 'Сохранение...', 'Сохранить');
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

///Слушатели формы добавления карточек
const popupNewCardForm = new PopupWithForm('.popup_new', () => {
    renderLoading(formAddCard, true, 'Создание...', 'Создать');
    const cardValue = {
        name: cardInput.name.value,
        link: cardInput.link.value
    };
    Promise.all([
        api.getUserInformation('users/me'),
        api.createItem('cards', cardValue.name, cardValue.link)
    ])
    .then((res) => {
        const [userInfo, item] = res;
        const userId = userInfo._id;
        const cardId = item._id;
        generateCard(cardId, item, userId);
    })
    .catch((err) => {
        console.log(`Ошибка ${err}`);
    })
    .finally(() => {
        renderLoading(formAddCard, false, 'Создание...', 'Создать');
    });
});

popupNewCardForm.setEventListeners();

///Слушатели смены фотографии
const popupChangePhoto = new PopupChangeAvatar('.popup_updatePhoto', (value) => {
    renderLoading(popupUpdatePhoto, true, 'Сохранение...', 'Сохранить');
    api.avatarEding('users/me/avatar', value.inputAddName)
    .then(res => {
        profilePhoto.style = `background-image: url(${res.avatar});`;
    })
    .finally(() => {
        renderLoading(popupUpdatePhoto, false, 'Сохранение...', 'Сохранить');
    });
});

popupChangePhoto.setEventListeners();

profileChangeAvatarButton.addEventListener('click', () => {
    changeAvatarButton.disabled = 'true';
    changeAvatarButton.classList.add('form__button_inactive');
    popupChangePhoto.open();
});


