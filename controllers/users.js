const User = require ('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UniError = require('../utils/errors');
const { secredKey } = require('../utils/constants');


// Получить пользователя
const getUser = (req, res, next) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw(new UniError({name: 'DocumentNotFoundError'}, 'получение пользователя'));
      }
    })
    .catch((err) => next(err));
};


// Получить информацию о пользователе
const getUserInfo = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw(new UniError({name: 'DocumentNotFoundError'}, 'получение пользователя'));
      }
    })
    .catch((err) => next(err));
};


// Получить всех пользователей
const getAllUsers = (req, res, next) => {
  User.find({})
    .then(allUsers => res.send({allUsers}))
    .catch((err) => next(err));
};


// Обновить пользователя
const updateUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then(() => {
      User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((user) => {
          if (!(user._id == id)) {
            throw(new UniError({name: 'AccessDeniedError'}, 'обновление пользователя'));
          }
          res.send(user);
        });
    })
    .catch((err) => next(err));
};


// Обновить аватар пользователя
const updateUserAvatar = (req, res, next) => {
  const id = req.user._id;
  const avatarLink = req.body.avatar;

  User.findById(id)
    .then(() => {
      User.findByIdAndUpdate(id, {avatar: avatarLink}, {new: true, runValidators: true})
        .then((user) => {
          if (!(user._id == id)) {
            throw(new UniError({name: 'AccessDeniedError'}, 'обновление пользователя'));
          }
          res.send(user);
        });
    })
    .catch((err) => next(err));
};


// Создать пользователя
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(async (hash) => {
      try {
        await User.create({ name, about, avatar, email, password: hash })
          .then((user) => {
            res.send({user});
          });
      } catch(err) {
        next(new UniError(err, 'создание пользователя'), res);
      }
    })
    .catch((err) => {
      next(err);
    });
};


// Логин пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({email})
    .select('+password')
    .then((user) => {
      if (!user) {
        throw(new UniError({name: 'LoginError'}, 'вход пользователя'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw(new UniError({name: 'LoginError'}, 'вход пользователя'));
          }
          const token = jwt.sign({_id: user._id}, secredKey, { expiresIn: '7d' });
          res.send({token});
        });
    })
    .catch(() => next(new UniError({name: 'LoginError'}, 'вход пользователя')));
};


module.exports = {createUser, getUser, getAllUsers, updateUser,
  updateUserAvatar, login, getUserInfo};