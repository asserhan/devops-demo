const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, index: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);



