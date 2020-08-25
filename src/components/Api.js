export class Api {
    constructor({baseURL, headers}) { //options https://mesto.nomoreparties.co/v1/cohortId/
        this.baseURL = baseURL;
        this.headers = headers;
    }

    getItems(id) { //id = cards +
        return fetch(`${this.baseURL}/${id}`, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    deleteItem(id, cardId) { //id = cards  cardId = cardId
        return fetch(`${this.baseURL}/${id}/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    createItem(id, cardName, cardLink) { //id = cards +
        return fetch(`${this.baseURL}/${id}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    putLike(id, cardId) { //id = cards/like cardId = cardId
        return fetch(`${this.baseURL}/${id}/${cardId}`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    removeLike(id, cardId) { //id = cards/like cardId = cardId
        return fetch(`${this.baseURL}/${id}/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    getUserInformation(id) { // id = users/me +
        return fetch(`${this.baseURL}/${id}`, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    profileEding(id, profileName, profileJob) { // id = users/me +
        return fetch(`${this.baseURL}/${id}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: profileName,
                about: profileJob
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    avatarEding(id, avatar) { // id = users/me/avatar
        return fetch(`${this.baseURL}/${id}`, {
            methosd: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }
}