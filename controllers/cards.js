const Card = require('../models/card');
const mongoose = require('mongoose');

const NOT_FOUND_ERROR = 404;
const DATA_ERROR = 400;
const ERROR = 500;


// Получить все карты
const getAllCards = (req, res) => {
  Card.find({})
    .then(allCards => res.send(allCards))
    .catch(() => res.status(ERROR).send({message: 'Ошибка получения карточек'}));
};


// Создать карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;  // ВРЕМЕННО
  const owner = new mongoose.Types.ObjectId(id);

  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch(() => res.status(DATA_ERROR).send({message: 'Неверные данные'}));
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
              res.status(NOT_FOUND_ERROR).send({message: 'Карточка не найдена'});
            }
          });
      } else {
        res.status(NOT_FOUND_ERROR).send({message: 'Карточка не найдена'});
      }
    })
    .catch(() => res.status(DATA_ERROR).send({message: 'Ошибка при удалении карточки'}));
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
        res.status(NOT_FOUND_ERROR).send({message: 'Карточка не найдена'});
      }
    })
    .catch(() => res.status(DATA_ERROR).send({message: 'Ошибка при лайке карточки'}));
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
        res.status(NOT_FOUND_ERROR).send({message: 'Карточка не найдена'});
      }
    })
    .catch(() => res.status(DATA_ERROR).send({message: 'Неверный ID'}));

};


module.exports = { getAllCards, createCard, deleteCard, likeCard, dislikeCard };