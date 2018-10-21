const calculateScoreRank = require('../../utils/calculate-score-rank')
const scoreSortParams = require('../../utils/score-sort-params')

module.exports = {
  scores: async (root, { workoutId, sort, dir }, { db }) => {
    try {
      const { type: workoutType } = await db.Workout.findById(workoutId)
      const scores = await db.Score.find({ workout: { $in: workoutId } })
        .sort(scoreSortParams({ sort, dir, workoutType }))
        .exec()

      return scores.map(score => ({
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
