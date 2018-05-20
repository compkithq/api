const mongoose = require('mongoose');

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_PORT,
  MONGO_HOST,
  MONGO_DB
} = process.env;

mongoose.connect(
  `mongodb://${MONGO_USER}:${encodeURIComponent(
    MONGO_PASS
  )}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
);

const connection = mongoose.connection;

module.exports = mongoose;
