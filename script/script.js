const formElement = document.querySelector('.popup'); //попап
const form = document.querySelector('.form'); //форма
const profileEdit = document.querySelector('.profile__edit'); //кнопка редактирования
const formCloseButton = formElement.querySelector('.popup__close'); //кнопка закрытие формы
const profileName = document.querySelector('.profile__name'); //имя в профиле
const profileJob = document.querySelector('.profile__about');  //подпись в профиле
const nameInput = formElement.querySelector('.form__input_el_name'); //имя в форме
const jobInput = formElement.querySelector('.form__input_el_spec'); //подпись в форме
const formButton = formElement.querySelector('.form__button'); //кнопка сохранить
const profileAddButton = document.querySelector('.profile__button'); //кнопка добавления карточки
const formAddCard = document.querySelector('.popup_new'); //попап добавления карточки
const closeButton = document.querySelector('.popup__close_new'); //кнопка закрытия попапа добавления карточек
const formAdd = document.querySelector('.form_new'); //форма добавления новой карточки
const card = {
    name: document.querySelector('.form__input_new_name'),
    link: document.querySelector('.form__input_new_link')
};
const buttonAdd = document.querySelector('.form__button_new');

const initialCards = [
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

const elements = document.querySelector('.elements'); //список всех карточек

///Функция закрытия формы, без отправки
function formClose() {
    formElement.classList.toggle('popup_close');
}


///Функция добавления карточек и лайков
function addCards(el) {

    const elementTemplate = document.querySelector("#tem-element").content;
    const element = elementTemplate.cloneNode(true); 

    const elementImage = element.querySelector(".element__photo"); 
    const elementTitle = element.querySelector(".element__name"); 

    elementImage.src = el.link;
    elementTitle.textContent = el.name;

    element.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_black');
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

    formAddCard.classList.toggle('popup_close');
}

///Функция открытия формы профиля
function formOpenClose() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formClose(formElement);
}

///Функция отправки формы
function formSubmitHandler (evt) {

    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    formClose(formElement);
}


///Выводим первые 6 карточек
for (let i = 0; i < initialCards.length; i++) {
    addCards(initialCards[i]);
}

profileAddButton.addEventListener('click', formClose); //открытие формы добавления карточки

profileEdit.addEventListener('click', formOpenClose); //открытие формы

form.addEventListener('submit', formSubmitHandler); //отправка формы

formCloseButton.addEventListener('click', formClose(formElement)); //закрытие без отправки

formAdd.addEventListener('submit', addNewCard);

closeButton.addEventListener('click', formClose);
