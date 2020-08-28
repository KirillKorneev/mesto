class Card {
    constructor({
        cardName, cardLink,
        handleCardClick,
        handleLikeClick,
        handleDeleteIconClick
    }, cardSelector) {
        this._cardSelector = cardSelector; 
        this._cardName = cardName; 
        this._cardLink = cardLink; 
        this._cardLike = false; 
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
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

    isLiked() {
        return this._element.querySelector('.element__like').classList.contains('element__like_black');
    }

    plusLike(res) {
        this._element.querySelector('.element__counter').textContent = res.likes.length + 1;
    }

    minusLike(res) {
        this._element.querySelector('.element__counter').textContent = res.likes.length - 1;
    }

    removeTrash() {
        this._element.querySelector('.element__delete').remove();
    }

    setLikes(res) {
        this._element.querySelector('.element__counter').textContent = res.likes.length;
    }

    toggleLikeButton() {
        this._element.querySelector('.element__like').classList.toggle('element__like_black');
    }

    //Функция проставки лайка(или его убирания)
    _toggleLike() {
        this._handleLikeClick();
    }

    //Функция удаления карточки
    _deleteCard() {
        this._handleDeleteIconClick();
    }

    removeCard() {
        this._element.remove();
    }

    //Функция задавания слушателей
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => this._toggleLike() );
        this._element.querySelector('.element__delete').addEventListener('click', () => this._deleteCard() );
        this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick() );
    }

    getView(userId, ownerId) {
        if (userId === ownerId) {
            return true;
        }
        return false;
    }

    //Функция создания карточек
    generateCards() {
        this._element = this._getTemplate();

        this._setEventListeners();

        const elementPhoto = this._element.querySelector('.element__photo');
        elementPhoto.src = `${this._cardLink}`;
        elementPhoto.alt = this._cardName;
        this._element.querySelector('.element__info').querySelector('.element__name').textContent = this._cardName;

        return this._element;

    }

}

export {Card};