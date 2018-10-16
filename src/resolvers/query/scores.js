const calculateRank = require('../../utils/calculate-rank')

module.exports = {
  scores: async (root, { workoutId }, { db }) => {
    try {
      const scores = await db.Score.find({
        workout: { $in: workoutId }
      }).exec()

      const { type: workoutType } = await db.Workout.findById(workoutId)

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
