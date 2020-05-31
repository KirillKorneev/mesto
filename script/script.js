const formElement = document.querySelector('.popup'); //попап
const form = document.querySelector('.form'); //форма
const profileEdit = document.querySelector('.profile__edit'); //кнопка редактирования
const formCloseButton = formElement.querySelector('.popup__close'); //кнопка закрытие формы
const profileName = document.querySelector('.profile__name'); //имя в профиле
const profileJob = document.querySelector('.profile__about');  //подпись в профиле
const nameInput = formElement.querySelector('.form__input_el_name'); //имя в форме
const jobInput = formElement.querySelector('.form__input_el_spec'); //подпись в форме
const profileAddButton = document.querySelector('.profile__button'); //кнопка добавления карточки
const formAddCard = document.querySelector('.popup_new'); //попап добавления карточки
const closeButton = document.querySelector('.popup__close_new'); //кнопка закрытия попапа добавления карточек
const formAdd = document.querySelector('.form_new'); //форма добавления новой карточки
const formPhoto = document.querySelector('.popup_photo'); //форма увеличения фото
const popPhoto = document.querySelector('.popup_photo'); //попап увеличения фото
const buttonClosePhoto = document.querySelector('.pop-image__close');
const card = {
    name: document.querySelector('.form__input_new_name'), //инпут названия в добавлении
    link: document.querySelector('.form__input_new_link') //инпут ссылки в добавлении
};

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


///Функция закрытия/открытия  формы, без отправки
///если здесь уьбрать отправку функции то в addEventListerner будут отсылаться undefined,
///а надо чтобы функция была, я решил проблему добавление 59 строки
function toggleForm(el) {
    if (el === formElement) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }
    el.classList.toggle('popup_close');
    return function toggle(){
        el.classList.toggle('popup_close');
    }
}

toggleForm(popPhoto);

///Функция добавления карточек и лайков / удаления каточек
function addCards(el) {

    const elementTemplate = document.querySelector("#tem-element").content;
    const element = elementTemplate.cloneNode(true); 

    const elementImage = element.querySelector(".element__photo"); 
    const elementTitle = element.querySelector(".element__name"); 

    const deleteButton = element.querySelector('.element__delete');
    const likeButton = element.querySelector('.element__like');

    const popImage = popPhoto.querySelector('.pop-image__image');
    const popName = popPhoto.querySelector('.pop-image__about');
    

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

        toggleForm(popPhoto);
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
function formSubmitHandler (evt) {

    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    toggleForm(formElement);
}


///Выводим первые 6 карточек
for (let i = 0; i < initialCards.length; i++) {
    addCards(initialCards[i]);
}

profileAddButton.addEventListener('click', toggleForm(formAddCard)); //открытие формы добавления карточек

profileEdit.addEventListener('click', toggleForm(formElement)); //открытие формы

form.addEventListener('submit', formSubmitHandler); //отправка формы

formCloseButton.addEventListener('click', toggleForm(formElement)); //закрытие без отправки

formAdd.addEventListener('submit', addNewCard); //отправка формы добавления

closeButton.addEventListener('click', toggleForm(formAddCard));  //закрытия формы добавления без отправки 

buttonClosePhoto.addEventListener('click', toggleForm(formPhoto)); //закрытие попапа увелтичения фото