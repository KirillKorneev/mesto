//Общие константы
const formElement = document.querySelector('.popup'); //попап изменения имени и работы
const formAddCard = document.querySelector('.popup_new'); //попап добавления карточки
const popupPhoto = document.querySelector('.popup_photo'); //попап увеличения фото
const profileName = document.querySelector('.profile__name'); //имя в профиле
const profileJob = document.querySelector('.profile__about');  //подпись в профиле
const elements = document.querySelector('.elements'); //список всех карточек
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
const card = {
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

///Функция добавления карточек и лайков / удаления каточек
function addCards(el) {

    const elementTemplate = document.querySelector("#tem-element").content;
    const element = elementTemplate.cloneNode(true); 

    const elementImage = element.querySelector(".element__photo"); 
    const elementTitle = element.querySelector(".element__name"); 

    const deleteButton = element.querySelector('.element__delete');
    const likeButton = element.querySelector('.element__like');

    const popImage = popupPhoto.querySelector('.pop-image__image');
    const popName = popupPhoto.querySelector('.pop-image__about');
    

    elementImage.src = el.link;
    elementTitle.textContent = el.name;

    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_black');
    });

    deleteButton.addEventListener('click', function() {
        deleteButton.closest('.element').remove();
    });

    elementImage.addEventListener('click', function() {
        popImage.src = el.link;
        popName.textContent = el.name;

        toggleForm(popupPhoto);
    });

    elements.prepend(element);
}

///Функция формы добавления новой карточки
function addNewCard(evt) {

    evt.preventDefault();

    const cardValue = {
        name: card.name.value,
        link: card.link.value
    };

    addCards(cardValue);

    toggleForm(formAddCard);
}

///Функция отправки формы
function formSubmitHandler(evt) {

    evt.preventDefault();

    profileName.textContent = inputChangeName.value;
    profileJob.textContent = inputChangeJob.value;

    toggleForm(formElement);
}



///Выводим первые 6 карточек
for (let i = 0; i < initialCards.length; i++) {
    addCards(initialCards[i]);
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

///Функция валидации
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_error',
});
