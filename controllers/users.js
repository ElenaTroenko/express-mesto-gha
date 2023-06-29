const User = require('../models/user');
const { sendError } = require('../utils/utils');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({data: user}))
    .catch((err) => sendError(res, err, 'ошибка создания пользователя'));
};

const getUser = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .then(user => res.send(user))
    .catch((err) => sendError(res, err, 'Пользователь не найден'));
};

const getAllUsers = (req, res) => {
  User.find({})
    .then(allUsers => res.send({allUsers}))
    .catch((err) => sendError(res, err, 'ошибка получения пользователей'));
};

const updateUser = (req, res) => {
  const id = req.body._id;

  User.findByIdAndUpdate(id, req.user, { new: true })
    .then((user) => res.send(user))
    .catch((err) => sendError(res, err, 'ошибка обновления пользователя'));
};

const updateUserAvatar = (req, res) => {
  const id = req.user._id;
  const avatarLink = req.body.avatar;

  User.findByIdAndUpdate(id, avatarLink, { new: true })
    .then((user) => res.send(user))
    .catch((err) => sendError(res, err, 'ошибка обновления аватара пользователя'));
};

module.exports = {createUser, getUser, getAllUsers, updateUser, updateUserAvatar};