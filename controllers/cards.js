const Card = require('../models/card');
const { sendError } = require('../utils/utils');

const getAllCards = (req, res) => {
  Card.find({})
    .then(allCards => res.send(allCards))
    .catch((err) => sendError(res, err, 'ошибка получения карточек'));
};


const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send(card))
    .catch((err) => sendError(res, err, 'ошибка создания карточки'));
};


const deleteCard = (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner._id == userId) {
        Card.findByIdAndRemove(cardId)
          .then(() => res.send({message: 'Пост удален'}))
          .catch((err) => sendError(res, err, 'ошибка удаления карточки'));
      } else {
        sendError(res, {}, 'доступ запрещен');
      }
    })
    .catch((err) => sendError(res, err, 'карточка не найдена'));
};

const likeCard = (req, res) => {
  const { cardId } = req.params.cardId;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner._id == userId) {
        Card.findByIdAndUpdate(
          cardId,
          { $addToSet: { likes: userId } },
          { new: true }
        )
          .then(card => res.send(card))
          .catch((err) => sendError(res, err, 'ошибка лайка карточки'));
      } else {
        sendError(res, {}, 'доступ запрещен');
      }
    })
    .catch((err) => sendError(res, err, 'карточка не найдена'));
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params.cardId;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner._id == userId) {
        Card.findByIdAndUpdate(
          cardId,
          { $pull: { likes: userId } },
          { new: true }
        )
          .then(card => res.send(card))
          .catch((err) => sendError(res, err, 'ошибка отзыва лайка карточки'));
      } else {
        sendError(res, {}, 'доступ запрещен');
      }
    })
    .catch((err) => sendError(res, err, 'карточка не найдена'));
};

module.exports = { getAllCards, createCard, deleteCard, likeCard, dislikeCard };