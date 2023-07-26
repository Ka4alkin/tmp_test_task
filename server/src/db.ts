const mongoose = require('mongoose');
const password = process.env.MONGO_PASSWORD;

const databaseURL = `mongodb+srv://doskoch25:${password}@cluster0.7sbgwq2.mongodb.net/`;

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Помилка підключення до MongoDB:'));
db.once('open', () => {
  console.log('Підключено до MongoDB!');
});

module.exports = db;
