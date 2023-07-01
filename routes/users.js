const userRouter = require('express').Router();
const {createUser, getAllUsers, getUser, updateUserAvatar, updateUser} = require('../controllers/users');


// роуты user
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);


module.exports = userRouter;