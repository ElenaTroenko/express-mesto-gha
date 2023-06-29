const Card = require('../models/card');


const getAllCards = (req, res) => {
  Card.find({})
    .then(allCards => res.send(allCards))
    .catch(() => res.status(500).send({message: 'Ошибка получения карточек'}));
};


const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send(card))
    .catch(() => res.status(400).send({message: 'Неверные данные'}));
};


const deleteCard = (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

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
    .catch(() => res.status(404).send({message: 'Карточка не найдена'}));
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
          .catch(() => res.status(400).send({message: 'Неверные данные'}));
      } else {
        res.status(500).send({message: 'Ошибка доступа'});
      }
    })
    .catch(() => res.status(404).send({message: 'Карточка не найдена'}));
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
          .catch(() => res.status(400).send({message: 'Неверные данные'}));
      } else {
        res.status(500).send({message: 'Ошибка доступа'});
      }
    })
    .catch(() => res.status(404).send({message: 'Карточка не найдена'}));
};

module.exports = { getAllCards, createCard, deleteCard, likeCard, dislikeCard };