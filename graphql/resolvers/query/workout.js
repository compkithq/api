const { calculateScoreRank } = require('../../utils')
const { scoreSortParams } = require('../../utils')

module.exports = {
  scores: async (
    { type: workoutType, scores: scoreIds },
    { sort, dir },
    { db }
  ) => {
    try {
      const scores = await db.Score.find({ _id: { $in: scoreIds } })
        .sort(scoreSortParams({ sort, dir, workoutType }))
        .exec()

      return scores.map((score) => ({
        ...score.toObject({ virtuals: true }),
        rank: calculateScoreRank({
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
