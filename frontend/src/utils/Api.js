class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  saveNewCard(nameInput, linkInput) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput,
        link: linkInput,
      }),
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  getUserData() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  saveUserData(nameInput, descriptionInput) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput,
        about: descriptionInput,
      }),
    })
      .then((res) => {
        return this._checkPromise(res);
      })}

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkPromise(res);
      })
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        return this._checkPromise(res);
      });
    }
    else {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._headers,
        }).then((res) => {
          return this._checkPromise(res);
        });
      }
}

  changeAvatar(linkInput) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkInput,
      }),
    })
        .then((res) => {
          return this._checkPromise(res);
        });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40",
  headers: {
    authorization: "242a0c65-83ea-4aa5-aad5-7b82cd182540",
    "Content-Type": "application/json",
  },
});

export default api;