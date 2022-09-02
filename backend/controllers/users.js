const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');

const User = require('../models/user');

const {
    NotFoundError,
} = require('../utils/errors/NotFoundError');
const { BadRequest } = require("../utils/errors/BadRequestError");
const { Unauthorized } = require("../utils/errors/UnauthorizedError");

module.exports.getUsers = (req, res, next) => {
    User.find({})
        .then((users) => res.status(200).send({ users }))
        .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
    User.findById(req.user._id)
        .orFail(new NotFoundError('Нет пользователя с таким id'))
        .then((user) => {

            res.status(200).send({ user })
        })
        .catch(next);
};

module.exports.getUser = (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .orFail(new NotFoundError('Нет пользователя с таким id'))
        .then((user) => res.status(200).send({ user }))
        .catch(next);
};

// module.exports.deleteUser = (req, res) => {
//   const { id } = req.body;
//   User.findByIdAndDelete(id)
//     .then(user => {
//       return res.status(200).send("удален")
//     })
// }

module.exports.createUser = (req, res, next) => {
    const {
        name,
        about,
        avatar,
        password,
        email,
    } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => User.create({
            email,
            name,
            avatar,
            about,
            password: hash,
        }))
        .then((user) => res.send(
            {
                name, email, avatar, about, id: user._id,
            },
        ))
        .catch(next);
};
module.exports.updateUser = (req, res, next) => {
    const {
        name,
        about,
    } = req.body;
    User.findByIdAndUpdate(req.user._id, {
        name,
        about,
    }, {
        runValidators: true,
        new: true,
    })
        .orFail(new NotFoundError('Нет пользователя с таким id'))
        .then((user) => res.status(200).send({ user }))
        .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, {
        runValidators: true,
        new: true,
    })
        .orFail(new NotFoundError('Нет пользователя с таким id'))
        .then((user) => res.send(user))
        .catch((err) => {
            if (err.name === 'CastError' || err.name === 'ValidationError') {
                next(new BadRequest('Переданы некорректные данные'))
            } else {
                next(err)
            }
        })
};

module.exports.login = (req, res, next) => {
    const {
        email,
        password,
    } = req.body;

    return User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? 'super-strong-secret' : JWT_SECRET, { expiresIn: '7d' });
            res.send({ token })
            ;
        })
        .catch(() => {
            next(new Unauthorized("Неправильные почта или пароль"))
        });
};
