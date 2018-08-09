const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Competition',
  Schema({
    name: 'String',
    leaderboards: [mongoose.Schema.Types.ObjectId],
    venue: mongoose.Schema.Types.ObjectId
  })
)
