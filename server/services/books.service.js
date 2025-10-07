const Book = require('../models/Book');

async function getAllBooks(filter = {}) {
  const { category } = filter;
  const query = {};
  if (category) query.category = category;
  const docs = await Book.find(query).sort({ createdAt: -1 }).lean();
  return docs;
}

async function insertManyBooks(books) {
  if (!Array.isArray(books)) return [];
  return await Book.insertMany(books, { ordered: false });
}

module.exports = {
  getAllBooks,
  insertManyBooks
};


