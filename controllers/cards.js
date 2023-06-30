const Card = require('../models/card');
const mongoose = require('mongoose');
const sendError = require ('../utils/utils');
const fixErr = require ('../utils/utils');


// Получить все карты
const getAllCards = (req, res) => {
  Card.find({})
    .then(allCards => res.send(allCards))
    .catch((err) => sendError(res, err, 'получение всех карточек'));
};


// Создать карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;  // ВРЕМЕННО
  const owner = new mongoose.Types.ObjectId(id);

  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch((err) => sendError(res, err, 'создание карточки'));
};


// Удалить карточку
const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => {
            if (card) {
              res.send({message: 'удалено'});
            } else {
              sendError(res, {name: 'CastError'}, 'удаление карточки');
            }
          });
      } else {
        sendError(res, {name: 'DocumentNotFoundError'}, 'удаление карточки');
      }
    })
    .catch((err) => {
      sendError(res, fixErr(err, 'DocumentNotFoundError', 'CastError'), 'удаление карточки');
    });
};


// Добавить лайк карточке
const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id; // ВРЕМЕННО

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

        sendError(res, {name: 'DocumentNotFoundError'}, 'добавить лайк карточке');      }
    })
    .catch((err) => {
      if (typeof(err) == !'CastError') {
        sendError(res, fixErr(err, 'CastError', 'DocumentNotFoundError'), 'добавить лайк карточке');
      } else {
        sendError(res, {name: 'CastError'}, 'добавить лайк карточке');
      }
    });
};


// Убрать лайк у карточки
const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id; // ВРЕМЕННО

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then(card => {
      if (card) {
        res.send(card);
      } else {
        sendError(res, {name: 'DocumentNotFoundError'}, 'отзыв лайка карточки');
      }
    })
    .catch((err) => {
      if (typeof(err) == !'CastError') {
        sendError(res, fixErr(err, 'CastError', 'DocumentNotFoundError'), 'отзыв лайка карточки');
      } else {
        sendError(res, {name: 'CastError'}, 'отзыв лайка карточки');
      }
    });
};


module.exports = { getAllCards, createCard, deleteCard, likeCard, dislikeCard };