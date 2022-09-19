class Api {
  constructor(userData) {
    this.userData = userData;
    this._headers = this.userData.headers;
    this._baseUrl = this.userData.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  // Загрузка данных о пользователе с сервера
  userName() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // Загрузка карточек с сервера
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // Сохранение измененных данных профиля
  saveUserName(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  uploadCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(data) {
    this._id = data._data._id;
    return fetch(`${this._baseUrl}/cards/${this._id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: this._id,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  likeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        likes: data._data.likes,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  dislikeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._data._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        likes: data._data.likes,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const user = {
  headers: {
    authorization: "5ef57d1b-1ea7-434a-b183-6df5295fe05d",
    "Content-Type": "application/json",
  },
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
};

const api = new Api(user);

export default api;
