const mongoose = require('./connection')
const { Schema } = mongoose

const Leaderboard = require('./leaderboard')

module.exports = Leaderboard.discriminator(
  'FinalsLeaderboard',
  Schema(
    {
      qualifiedAthletes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Athlete'
        }
      ]
    },
    { discriminatorKey: 'type' }
  )
)
