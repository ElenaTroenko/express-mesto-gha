const User = require ('../models/user');
const sendError = require ( '../utils/utils');


// Создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({data: user}))
    .catch((err) => sendError(res, err, 'создание пользователя'));
};


// Получить пользователя
const getUser = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        sendError(res, {name: 'DocumentNotFoundError'}, 'получение пользователя');
      }
    })
    .catch((err) => sendError(res, err, 'получение пользователя'));
};


// Получить всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then(allUsers => res.send({allUsers}))
    .catch((err) => sendError(res, err, 'получение всех пользователей'));
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
        .catch((err) => sendError(res, err, 'обновление пользователя'));
    })
    .catch((err) => sendError(res, err, 'обновление пользователя'));
};


// Обновить аватар пользователя
const updateUserAvatar = (req, res) => {
  const id = req.user._id; // ВРЕМЕННО
  const avatarLink = req.body.avatar;

  User.findById(id)
    .then(() => {
      User.findByIdAndUpdate(id, {avatar: avatarLink}, { new: true, runValidators: true })
        .then((user) => res.send(user))
        .catch((err) => sendError(res, err, 'обновление аватара пользователя'));
    })
    .catch((err) => sendError(res, err, 'обновление аватара пользователя'));
};


module.exports = {createUser, getUser, getAllUsers, updateUser, updateUserAvatar};