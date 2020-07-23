//Общие константы
const formElement = document.querySelector('.popup'); //попап изменения имени и работы
const formAddCard = document.querySelector('.popup_new'); //попап добавления карточки
const popupPhoto = document.querySelector('.popup_photo'); //попап увеличения фото
const profileName = document.querySelector('.profile__name'); //имя в профиле
const profileJob = document.querySelector('.profile__about');  //подпись в профиле
const elements = document.querySelector('.elements'); //список всех карточек
const data = { //объект для форм
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error_active'
}
const formList = Array.from(document.querySelectorAll(data.formSelector)); //массив форм
const initialCards = [ //начальные карточки
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
const formChange = document.forms.formChange; //форма
const inputChangeName = formChange.elements.inputChangeName; //инпут имени
const inputChangeJob = formChange.elements.inputChangeJob; //инпут работы
const profileEdit = document.querySelector('.profile__edit'); //кнопка открытия этой формы
const formCloseButton = formElement.querySelector('.popup__close'); //кнопка закрытие этой формы

//Форма добавления карточек
const profileAddButton = document.querySelector('.profile__button'); //кнопка открытия этой формы
const formAdd = document.forms.formAdd; //форма
const closeButton = document.querySelector('.popup__close_new'); //кнопка закрытие этой формы
const cardInput = {
    name: formAdd.elements.inputAddName, //инпут названия 
    link: formAdd.elements.inputAddLink //инпут ссылки
};

//Попап увеличения картинки
const buttonClosePhoto = document.querySelector('.pop-image__close'); //кретсик закрытия

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
    document.addEventListener('keydown', function(evt){
        if(evt.key === "Escape") {
            toggleForm(el);
        }
    });

}
