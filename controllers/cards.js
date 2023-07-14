const Card = require('../models/card');
const mongoose = require('mongoose');
const UniError = require('../utils/errors');


// Получить все карты
const getAllCards = (req, res, next) => {
  Card.find({})
    .then(allCards => res.send(allCards))
    .catch((err) => next(new UniError(err, 'получение всех карточек')));
};


// Создать карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;
  const owner = new mongoose.Types.ObjectId(id);

  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch((err) => next(new UniError(err, 'создание карточки')));
};


// Удалить карточку
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (String(card.owner._id).replace('new OwnerId("', '').replace('")', '') !== req.user._id) {
          throw(new UniError({name:'AccessDeniedError'}));
        }
        // права подтверждены. карта есть. выполняем удаление
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            if (card) {
              res.send({message: 'удалено'});
            } else {
              throw(new UniError({name: 'CastError'}));
            }
          });
      } else {
        throw(new UniError({name:'DocumentNotFoundError'}));
      }
    })
    .catch((err) => {
      next(new UniError({message: err.message, name: err.name}, 'удаление карточки'));
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
          .then((card) => res.send(card));
      } else {
        throw(new UniError({name: 'DocumentNotFoundError'}));
      }
    })
    .catch((err) => {
      next(new UniError({message: err.message, name: err.name}, 'добавить лайк карточке'));
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
      next(new UniError({message: err.message, name: err.name}, 'удалить лайк у карточки'));
    });
};


module.exports = { getAllCards, createCard, deleteCard, likeCard, dislikeCard };