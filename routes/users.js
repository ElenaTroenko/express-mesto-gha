const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {createUser, getAllUsers, getUser, updateUserAvatar,
  getUserInfo, updateUser, login} = require('../controllers/users');
const { Joi, celebrate } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const authSchema = {
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  })
};
const createUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};
const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
};
const getUserSchema = {
  params: Joi.object().keys({
    userId: Joi.required(),
  })
};
const updateUserSchema= {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};
const updateUserAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegex),
  }),
};


// роуты user, не требующие авторизации
userRouter.post('/signup', celebrate(createUserSchema), createUser);
userRouter.post('/signin', celebrate(loginSchema), login);

// Мидлвар-защита роутов авторизацией
userRouter.use('/', celebrate(authSchema), auth);

// роуты user
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', celebrate(getUserSchema), getUser);
userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', celebrate(updateUserSchema), updateUser);
userRouter.patch('/users/me/avatar', celebrate(updateUserAvatarSchema), updateUserAvatar);



module.exports = userRouter;