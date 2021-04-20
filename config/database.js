require('dotenv').config();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const dbName = process.env.MONGO_DB_NAME;

module.exports = {
  database: `mongodb+srv://${username}:${password}@${dbName}`,
  secret: 'yoursecret',
} 