const mongoose = require('mongoose');
const validator = require('validator');


// схема user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    require: true,
  },
  email: {
    unique: true,
    type: String,
    require: function() {
      validator.isEmail(this.email);
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    select: false,
  },
});


module.exports = mongoose.model('user', userSchema);