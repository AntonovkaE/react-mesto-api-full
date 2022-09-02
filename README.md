# Проект Mesto фронтенд + бэкенд
 Проект включает фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд распологается в директории `back/`, а фронтенд - в `frontend/`. 

Цель работы деплой проекта. Был создана удаленный сервер, и на него выложены фронтенд и бэкенд проекта.

## Роуты
### Доступные всем:

- /sign-up — для регистрации пользователя;
- /sign-in — для авторизации пользователя.

### Только авторизованным пользователям:

- /cards - получение главной страницы (get);
- /cards:id - получние карточки c id (get);
- /cards - создание карточки (post);
- /cards/:id/likes - постановка/удаление лайка (put/delete);


- /users - получение информации о всех пользователях (get);
- /users/me - информация о текущем пользователе (get);
- /users/:id -поиск пользователя по id (get);
- /users/me - обновление данных (patch);
- /users/me/avatar - обновление аватара (patch).

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black) <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/> 

Публичный IP: 62.84.116.203

[Бэкенд](https://api.mesto.praktikum.nomoredomains.sbs)

[Задеплоенный сайт](https://mesto.praktikum.nomoredomains.sbs)
