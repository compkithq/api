const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model(
  'Workout',
  Schema({
    description: 'String',
    leaderboard: Schema.Types.ObjectId,
    standards: 'String',
    name: 'String',
    scores: [Schema.Types.ObjectId],
    type: 'String'
  })
)
