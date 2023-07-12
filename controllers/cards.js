const Card = require('../models/card');
const mongoose = require('mongoose');
const fixErr = require('../utils/utils');
const { UniError } = require('../utils/errors');


// Получить все карты
const getAllCards = (req, res, next) => {
  Card.find({})
    .then(allCards => res.send(allCards))
    .catch((err) => next(new UniError(err)));
};


// Создать карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;
  const owner = new mongoose.Types.ObjectId(id);

  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch((err) => next(new UniError(err)));
};


// Удалить карточку
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (!(card.owner._id == req.user._id)) {
          throw(new UniError({message: 'Доступ запрещен', statusCode: 403}, 'удаление карточки'));
        }
        // права подтверждены. карта есть. выполняем удаление
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => {
            if (card) {
              res.send({message: 'удалено'});
            } else {
              throw(new UniError({name: 'CastError'}, 'удаление карточки'));
            }
          });
      } else {
        throw(new UniError({name: 'DocumentNotFoundError'}, 'удаление карточки'));
      }
    })
    .catch((err) => {
      if (typeof(err) == !'CastError') {
        next(fixErr(err, 'CastError', 'DocumentNotFoundError'));
      } else {
        next({name: 'CastError'});
      }
    });
};


// Добавить лайк карточке
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (card) {
        Card.findByIdAndUpdate(
          cardId,
          { $addToSet: { likes: userId } },
          { new: true }
        )
          .then(card => res.send(card));
      } else {
        throw(new UniError({name: 'DocumentNotFoundError'}, 'добавить лайк карточке'));
      }
    })
    .catch((err) => {
      if (typeof(err) == !'CastError') {
        next(fixErr(err, 'CastError', 'DocumentNotFoundError'));
      } else {
        next({name: 'CastError'});
      }
    });
};


// Убрать лайк у карточки
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then(card => {
      if (card) {
        res.send(card);
      } else {
        throw(new UniError({name: 'DocumentNotFoundError'}));
      }
    })
    .catch((err) => {
      if (typeof(err) == !'CastError') {
        next(fixErr(err, 'CastError', 'DocumentNotFoundError'));
      } else {
        next({name: 'CastError'}, 'отзыв лайка карточки');
      }
    });
};


module.exports = { getAllCards, createCard, deleteCard, likeCard, dislikeCard };