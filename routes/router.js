const router = require('express').Router();
const {
  createUser, getAllUsers, getUser,
  updateUserAvatar, updateUser,
} = require('../controllers/users');

const {
  getAllCards, createCard, deleteCard,
  likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;