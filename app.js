const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649b3285d0a11b55c8b60201' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}...`);
});