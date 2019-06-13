const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const db = require('../../db')

module.exports = new DataLoader(async leaderboardIds => {
  const leaderboards = await db.Leaderboard.find({
    _id: { $in: leaderboardIds }
  }).exec()
  const leaderboardsById = keyBy(leaderboards, '_id')

  return leaderboardIds.map(leaderboardId => leaderboardsById[leaderboardId])
})
