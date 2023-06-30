const Card = require('../models/card');
const mongoose = require('mongoose');
const sendError = require ( '../utils/utils');


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
              sendError(res, {name: '400'}, 'удаление карточки');
            }
          });
      } else {
        sendError(res, {name: '404'}, 'удаление карточки');
      }
    })
    .catch((err) => sendError(res, err, 'удаление карточки'));
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
        sendError(res, {name: ''}, 'добавление лайка карточке');
      }
    })
    .catch((err) => sendError(res, err, 'добавление лайка карточке'));
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
        sendError(res, {name: ''}, 'отзыв лайка карточке');
      }
    })
    .catch((err) =>sendError(res, err, 'отзыв лайка карточке'));

};


module.exports = { getAllCards, createCard, deleteCard, likeCard, dislikeCard };