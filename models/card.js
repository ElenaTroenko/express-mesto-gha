const mongoose = require('mongoose');
const { urlRegex } = require('../utils/constants');
const { ObjectId } = mongoose.Schema.Types;


// схема card
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: function() {
      return urlRegex.test(this.avatar);
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: [ObjectId],
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('card', cardSchema);