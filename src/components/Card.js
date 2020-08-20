class Card {
    constructor(cardName, cardLink, handleCardClick ,cardSelector) {
        this._cardSelector = cardSelector; //Шаблон
        this._cardName = cardName; //Название
        this._cardLink = cardLink; //Ссылка
        this._cardLike = false; //Лайкнута?
        this._handleCardClick = handleCardClick;
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

    //Функция задавания слушателей
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => this._toggleLike() );
        this._element.querySelector('.element__delete').addEventListener('click', () => this._deleteCard() );
        this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick() );
    }

    
    //Функция создания карточек
    generateCards() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector('.element__photo').src = `${this._cardLink}`;
        this._element.querySelector('.element__photo').alt = this._cardName;
        this._element.querySelector('.element__info').querySelector('.element__name').textContent = this._cardName;

        return this._element;

    }

}

export {Card};