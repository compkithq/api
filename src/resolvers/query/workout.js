const calculateRank = require('../../utils/calculate-rank')
const scoreSortParams = require('../../utils/score-sort-params')

module.exports = {
  leaderboard: async (
    { leaderboard: id },
    args,
    { loaders: { leaderboardLoader } }
  ) => {
    try {
      const leaderboard = await leaderboardLoader.load(id)

      return leaderboard
    } catch (e) {
      return e
    }
  },

  scores: async (
    { type: workoutType, scores: scoreIds },
    { sort, dir },
    { db }
  ) => {
    try {
      const scores = await db.Score.find({ _id: { $in: scoreIds } })
        .sort(scoreSortParams({ sort, dir }))
        .exec()

      return scores.map(score => ({
        ...score.toObject({ virtuals: true }),
        rank: calculateRank({
          scores,
          score: score.value,
          workoutType
        })
      }))
    } catch (e) {
      return e
    }
  }
}
