const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Workout',
  Schema({
    description: 'String',
    leaderboard: mongoose.Schema.Types.ObjectId,
    name: 'String',
    type: 'String'
  })
)
