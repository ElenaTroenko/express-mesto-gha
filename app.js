const express = require('express');
const mongoose = require('mongoose');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const bodyParser = require('body-parser');
const sendError = require ('./utils/utils');

const { PORT = 3000 } = process.env;
const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649b3285d0a11b55c8b60201'
  };
  next();
});  // ВРЕМЕННО

// Роутер карт
app.use('/', cardRouter);
// Роутер пользователей
app.use('/', userRouter);
// Хэндлер 404 страниц
app.use('/', (req, res) => sendError(res, {name: 'DocumentNotFoundError'}, 'Страница не найдена'));

// Подключение к БД
mongoose.connect('mongodb://127.0.0.1:27017/mestodb',
);

// Запуск
app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}...`);
});