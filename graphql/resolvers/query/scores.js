const { calculateScoreRank } = require('../../utils')
const { scoreSortParams } = require('../../utils')

module.exports = {
  scores: async (root, { workoutId, sort, dir }, { db }) => {
    try {
      const { type: workoutType } = await db.Workout.findById(workoutId).exec()
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
