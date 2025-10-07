const express = require('express');
const cors = require('cors');

const booksRouter = require('../routes/books.routes');

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Routes (only books)
app.use('/api/books', booksRouter);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

module.exports = app;


