const { Schema } = require('mongoose')
const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const { Leaderboard } = require('./leaderboard')

const QualifiersLeaderboard = Leaderboard.discriminator(
  'QualifiersLeaderboard',
  Schema({}, { discriminatorKey: 'type' })
)

const qualifiersLeaderboardLoader = () =>
  new DataLoader(async leaderboardIds => {
    const leaderboards = await QualifiersLeaderboard.find({
      _id: { $in: leaderboardIds }
    }).exec()
    const leaderboardsById = keyBy(leaderboards, '_id')

    return leaderboardIds.map(leaderboardId => leaderboardsById[leaderboardId])
  })

module.exports = {
  QualifiersLeaderboard,
  qualifiersLeaderboardLoader
}
