require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { connectToDatabase } = require('../app/db');
const Book = require('../models/Book');

async function run() {
  try {
    await connectToDatabase(process.env.MONGODB_URI);

    const docs = [
      { title: 'The Midnight Library', author: 'Matt Haig', price: 24.99, category: 'fiction', image: '📚' },
      { title: 'Atomic Habits', author: 'James Clear', price: 27.99, category: 'self-help', image: '📖' },
      { title: 'Educated', author: 'Tara Westover', price: 22.99, category: 'biography', image: '📕' },
      { title: 'Project Hail Mary', author: 'Andy Weir', price: 26.99, category: 'fiction', image: '📗' },
      { title: 'Sapiens', author: 'Yuval Noah Harari', price: 29.99, category: 'non-fiction', image: '📘' },
      { title: 'The Psychology of Money', author: 'Morgan Housel', price: 23.99, category: 'self-help', image: '📙' },
      { title: 'Becoming', author: 'Michelle Obama', price: 28.99, category: 'biography', image: '📔' },
      { title: 'The Alchemist', author: 'Paulo Coelho', price: 19.99, category: 'fiction', image: '📓' }
    ];

    await Book.deleteMany({});
    await Book.insertMany(docs);
    console.log(`Seeded ${docs.length} books.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();


