require('dotenv').config();
const app = require('./app/app');
const { connectToDatabase } = require('./app/db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectToDatabase(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
