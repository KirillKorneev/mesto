import {toggleForm} from './index.js';

class Card {
    constructor(cardName, cardLink, cardSelector) {
        this._cardSelector = cardSelector; //Шаблон
        this._cardName = cardName; //Название
        this._cardLink = cardLink; //Ссылка
        this._cardLike = false; //Лайкнута?
    }

    //Функция клонирования шаблона
    _getTemplate() { 
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    //Функция проставки лайка(или его убирания)
    _toggleLike() {
        this._cardLike = !this._cardLike;
        this._element.querySelector('.element__like').classList.toggle('element__like_black');
    }

    //Функция удаления карточки
    _deleteCard() {
        this._element.remove();
    }

    //Функция подготовки и открытия увеличенного фото
    _popupPhoto() {
        popupPhoto.querySelector('.pop-image__image').src = this._cardLink;
        popupPhoto.querySelector('.pop-image__about').textContent = this._cardName;

        toggleForm(popupPhoto);
    }


    //Функция задавания слушателей
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => this._toggleLike() );
        this._element.querySelector('.element__delete').addEventListener('click', () => this._deleteCard() );
        this._element.querySelector('.element__photo').addEventListener('click', () => this._popupPhoto() );
    }

    
    //Функция создания карточек
    generateCards() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector('.element__photo').src = `${this._cardLink}`;
        this._element.querySelector('.element__info').querySelector('.element__name').textContent = this._cardName;

        return this._element;

    }

}

export {Card};