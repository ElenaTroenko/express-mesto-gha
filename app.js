const express = require('express');
const mongoose = require('mongoose');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const bodyParser = require('body-parser');
const UniError = require('./utils/errors');
const { sendError } = require('./utils/utils');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();


app.use(bodyParser.json());
app.use('/', userRouter);           // Роутер пользователей
app.use('/', cardRouter);           // Роутер карт
app.use('/', () => {                // Хэндлер 404 страниц
  throw(new UniError({name: 'DocumentNotFoundError'}, 'Страница не найдена'));
});
app.use(errors());                  // Обработчик ошибок celebrate
app.use((err, req, res, next) => {  // Централизованный бработчик ошибок
  sendError(err, res);
  next();
});

// Подключение к БД
mongoose.connect('mongodb://127.0.0.1:27017/mestodb',
);

// Запуск
app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}...`);
});