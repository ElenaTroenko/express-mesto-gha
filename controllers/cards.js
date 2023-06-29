const Card = require('../models/card');
const mongoose = require('mongoose');

const getAllCards = (req, res) => {
  Card.find({})
    .then(allCards => res.send(allCards))
    .catch(() => res.status(500).send({message: 'Ошибка получения карточек'}));
};


const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;  // ВРЕМЕННО

  const owner = new mongoose.Types.ObjectId(id);

  console.log(name, link);
  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch(() => res.status(400).send({message: 'Неверные данные'}));
};


const deleteCard = (req, res) => {
  const cardId = req.params;
  const userId = req.user._id; // ВРЕМЕННО

  Card.findById(cardId)
    .then((card) => {
      if (card.owner._id == userId) {
        Card.findByIdAndRemove(cardId)
          .then(() => res.send({message: 'Пост удален'}))
          .catch(res.status(400).send({message: 'Неверные данные'}));
      } else {
        res.status(500).send({message: 'Ошибка доступа'});
      }
    })
    .catch(() => res.status(400).send({message: 'Карточка не найдена'}));
};

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
        res.status(404).send({message: 'Карта не найдена'});
      }
    })
    .catch(() => res.status(400).send({message: 'Ошибка при лайке карточки'}));
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id; // ВРЕМЕННО

  Card.findById(cardId)
    .then((card) => {
      if (card.owner._id == userId) {
        Card.findByIdAndUpdate(
          cardId,
          { $pull: { likes: userId } },
          { new: true }
        )
          .then(card => res.send(card))
          .catch(() => res.status(400).send({message: 'Неверные данные'}));
      } else {
        res.status(500).send({message: 'Ошибка доступа'});
      }
    })
    .catch(() => res.status(404).send({message: 'Карточка не найдена'}));
};

module.exports = { getAllCards, createCard, deleteCard, likeCard, dislikeCard };