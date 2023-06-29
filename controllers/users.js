const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({data: user}))
    .catch(() => res.status(400).send({message: ''}));
};

const getUser = (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch(() => res.status(400).send({message: ''}));
};

const getAllUsers = (req, res) => {
  User.find({})
    .then(allUsers => res.send({allUsers}))
    .catch(() => res.status(500).send({message: ''}));
};

const updateUser = (req, res) => {
  const id = req.user._id;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch(() => res.status(404).send({message: ''}));
};

const updateUserAvatar = (req, res) => {
  const id = req.user._id;
  const avatarLink = req.body.avatar;

  User.findByIdAndUpdate(id, avatarLink, { new: true })
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({message: ''}));
};

module.exports = {createUser, getUser, getAllUsers, updateUser, updateUserAvatar};