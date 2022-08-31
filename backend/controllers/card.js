const Card = require('../models/card');
const {
  NotFoundError,
} = require('../utils/errors/NotFoundError');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { BadRequest } = require("../utils/errors/BadRequestError");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
    if (err.code === 11000) {
      'Пользователь с таким email существует';
    }
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные' ))
    }
    else {
      next(err)
    }
  });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFoundError('Карточки с таким не существует'))
    .then((card) => {
      if (String(card.owner) !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужую карточку');
      }
      return card.remove({ _id: req.params.id })
        .then((removedCard) => res.send(removedCard));
    })

    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => {
      res.send(card)
    })
    .catch(error => console.log(error));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch(next);
};
