const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Competition',
  Schema({
    name: 'String',
    venue: mongoose.Schema.Types.ObjectId,
  }),
)
