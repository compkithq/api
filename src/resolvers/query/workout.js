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

  scores: async (
    { type: workoutType, scores: scoreIds },
    { sort, dir },
    { db }
  ) => {
    try {
      let scaledSort = {}

      if (sort === 'rank') scaledSort = { scaled: dir === 'asc' ? 1 : -1 }

      const sortField = sort === 'rank' ? 'value' : sort

      const scores = await db.Score.find({ _id: { $in: scoreIds } })
        .sort({ ...scaledSort, [sortField]: dir === 'asc' ? 1 : -1 })
        .exec()

      return scores.map((score, index) => ({
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
