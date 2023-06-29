const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({data: user}))
    .catch(() => res.status(400).send({message: 'Неверные данные'}));
};

const getUser = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({message: 'Пользователь не найден'});
      }
    })
    .catch(() => res.status(500).send({message: 'Пользователь не найден'}));
};

const getAllUsers = (req, res) => {
  User.find({})
    .then(allUsers => res.send({allUsers}))
    .catch(() => res.status(500).send({message: 'Ошибка получения пользователей'}));
};

const updateUser = (req, res) => {
  const id = req.user._id; // ВРЕМЕННО

  User.findById(id)
    .then(() => {
      User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((user) => {
          res.send(user);
        })
        .catch(() => res.status(400).send({message: 'Неверные данные'}));
    })
    .catch(() => res.status(404).send({message: 'Пользователь не найден'}));


};

const updateUserAvatar = (req, res) => {
  const id = req.user._id; // ВРЕМЕННО
  const avatarLink = req.body.avatar;

  User.findById(id)
    .then(() => {
      User.findByIdAndUpdate(id, {avatar: avatarLink}, { new: true, runValidators: true })
        .then((user) => res.send(user))
        .catch(() => res.status(400).send({message: 'Неверные данные'}));
    })
    .catch(() => res.status(404).send({message: 'Пользователь не найден'}));
};

module.exports = {createUser, getUser, getAllUsers, updateUser, updateUserAvatar};