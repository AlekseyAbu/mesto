export class Api {
    constructor({ baseUrl, headers, groupID }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._groupID = groupID;
    }

    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deletInitialCards(id) {
        return fetch(`${this._baseUrl}/${this._groupID}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
    }

    createInitialCards(item) {
        return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(item)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
            headers: this._headers
        })
        .then( res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    likeCard(id) {
        return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
    }

    dislikeCard(id) {
        return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
    }

    creatProfile({name, about}) {
        return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({name, about})
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
    }

    creatAvatar(userAvatar) {
        return fetch(`${this._baseUrl}/${this._groupID}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: userAvatar})
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        }) 
    }
}