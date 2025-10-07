const mongoose = require('mongoose');

async function connectToDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing');
  }
  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB || undefined
  });
  return mongoose.connection;
}

module.exports = {
  connectToDatabase
};


