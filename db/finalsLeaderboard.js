const { Schema } = require('mongoose')
const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const { Leaderboard } = require('./leaderboard')

const FinalsLeaderboard = Leaderboard.discriminator(
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

const finalsLeaderboardLoader = () =>
  new DataLoader(async (leaderboardIds) => {
    const leaderboards = await FinalsLeaderboard.find({
      _id: { $in: leaderboardIds }
    }).exec()
    const leaderboardsById = keyBy(leaderboards, '_id')

    return leaderboardIds.map(
      (leaderboardId) => leaderboardsById[leaderboardId]
    )
  })

module.exports = {
  FinalsLeaderboard,
  finalsLeaderboardLoader
}
