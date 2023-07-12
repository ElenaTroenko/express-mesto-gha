const cardRouter = require('express').Router();
const {getAllCards, createCard, deleteCard, likeCard, dislikeCard} = require('../controllers/cards');
const { Joi, celebrate } = require('celebrate');

const createCardSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
};
const baseCardSchema = {
  params: Joi.object().keys({
    cardId: Joi.required(),
  }),
};


// роуты cards
cardRouter.get('/cards', getAllCards);
cardRouter.post('/cards', celebrate(createCardSchema), createCard);
cardRouter.delete('/cards/:cardId', celebrate(baseCardSchema), deleteCard);
cardRouter.put('/cards/:cardId/likes', celebrate(baseCardSchema), likeCard);
cardRouter.delete('/cards/:cardId/likes', celebrate(baseCardSchema), dislikeCard);


module.exports = cardRouter;