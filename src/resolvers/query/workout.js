const calculateRank = require('../../utils/calculate-rank')

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

  scores: async ({ type: workoutType, scores: scoreIds }, args, { db }) => {
    try {
      const scores = await db.Score.find({ _id: { $in: scoreIds } }).exec()

      return scores.map((score, index) => ({
        ...score.toObject({ virtuals: true }),
        rank: calculateRank({
          scores,
          score: score.value,
          type: workoutType
        })
      }))
    } catch (e) {
      return e
    }
  }
}
