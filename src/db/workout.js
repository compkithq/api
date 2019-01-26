const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Workout',
  Schema({
    description: 'String',
    leaderboard: mongoose.Schema.Types.ObjectId,
    standards: 'String',
    name: 'String',
    scores: [mongoose.Schema.Types.ObjectId],
    type: 'String'
  })
)
