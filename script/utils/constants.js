//Общие константы
export const formElement = document.querySelector('.popup'); //попап изменения имени и работы
export const formAddCard = document.querySelector('.popup_new'); //попап добавления карточки
export const popupPhoto = document.querySelector('.popup_photo'); //попап увеличения фото
export const profileName = document.querySelector('.profile__name'); //имя в профиле
export const profileJob = document.querySelector('.profile__about');  //подпись в профиле
export const elements = document.querySelector('.elements'); //список всех карточек
export const data = { //объект для форм
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error_active'
}
export const formList = Array.from(document.querySelectorAll(data.formSelector)); //массив форм

export const initialCards = [ //начальные карточки
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Форма смены имени и работы
export const formChange = document.forms.formChange; //форма
export const inputChangeName = formChange.elements.inputChangeName; //инпут имени
export const inputChangeJob = formChange.elements.inputChangeJob; //инпут работы
export const profileEdit = document.querySelector('.profile__edit'); //кнопка открытия этой формы
export const formCloseButton = formElement.querySelector('.popup__close'); //кнопка закрытие этой формы

//Форма добавления карточек
export const profileAddButton = document.querySelector('.profile__button'); //кнопка открытия этой формы
export const formAdd = document.forms.formAdd; //форма
export const closeButton = document.querySelector('.popup__close_new'); //кнопка закрытие этой формы
export const cardInput = {
    name: formAdd.elements.inputAddName, //инпут названия 
    link: formAdd.elements.inputAddLink //инпут ссылки
};

//Попап увеличения картинки
export const buttonClosePhoto = document.querySelector('.pop-image__close'); //кретсик закрытия