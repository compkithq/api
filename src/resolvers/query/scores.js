const calculateRank = require('../../utils/calculate-rank')
const scoreSortParams = require('../../utils/score-sort-params')

module.exports = {
  scores: async (root, { workoutId, sort, dir }, { db }) => {
    try {
      const scores = await db.Score.find({ workout: { $in: workoutId } })
        .sort(scoreSortParams({ sort, dir }))
        .exec()

      const { type: workoutType } = await db.Workout.findById(workoutId)

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
