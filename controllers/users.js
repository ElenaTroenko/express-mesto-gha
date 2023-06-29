const User = require('../models/user');

const NOT_FOUND_ERROR = 404;
const DATA_ERROR = 400;
const ERROR = 500;


// Создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({data: user}))
    .catch(() => res.status(DATA_ERROR).send({message: 'Неверные данные'}));
};


// Получить пользователя
const getUser = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(NOT_FOUND_ERROR).send({message: 'Пользователь не найден'});
      }
    })
    .catch(() => res.status(DATA_ERROR).send({message: 'Пользователь не найден'}));
};


// Получить всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then(allUsers => res.send({allUsers}))
    .catch(() => res.status(ERROR).send({message: 'Ошибка получения пользователей'}));
};


// Обновить пользователя
const updateUser = (req, res) => {
  const id = req.user._id; // ВРЕМЕННО

  User.findById(id)
    .then(() => {
      User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((user) => {
          res.send(user);
        })
        .catch(() => res.status(DATA_ERROR).send({message: 'Неверные данные'}));
    })
    .catch(() => res.status(NOT_FOUND_ERROR).send({message: 'Пользователь не найден'}));
};


// Обновить аватар пользователя
const updateUserAvatar = (req, res) => {
  const id = req.user._id; // ВРЕМЕННО
  const avatarLink = req.body.avatar;

  User.findById(id)
    .then(() => {
      User.findByIdAndUpdate(id, {avatar: avatarLink}, { new: true, runValidators: true })
        .then((user) => res.send(user))
        .catch(() => res.status(DATA_ERROR).send({message: 'Неверные данные'}));
    })
    .catch(() => res.status(NOT_FOUND_ERROR).send({message: 'Пользователь не найден'}));
};


module.exports = {createUser, getUser, getAllUsers, updateUser, updateUserAvatar};