const booksService = require('../services/books.service');

async function listBooks(req, res, next) {
  try {
    const { category } = req.query;
    const books = await booksService.getAllBooks({ category });
    res.json(books);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listBooks
};


