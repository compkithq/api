const mongoose = require('./connection')
const { Schema } = mongoose

const Leaderboard = require('./leaderboard')

module.exports = Leaderboard.discriminator(
  'QualifiersLeaderboard',
  Schema({}, { discriminatorKey: 'type' })
)
