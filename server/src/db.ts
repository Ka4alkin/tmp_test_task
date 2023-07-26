const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/vandal';

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
