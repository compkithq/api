const mongoose = require('./connection');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'Venue',
  Schema({
    name: 'String',
    competitions: [mongoose.Schema.Types.ObjectId]
  })
);
