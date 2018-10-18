const calculateRank = require('../../utils/calculate-rank')

module.exports = {
  scores: async (root, { workoutId, sort, dir }, { db }) => {
    try {
      let scaledSort = {}

      if (sort === 'rank')
        scaledSort = {
          scaled: dir === 'asc' ? 1 : -1
        }

      const sortField = sort === 'rank' ? 'value' : sort

      const scores = await db.Score.find({ workout: { $in: workoutId } })
        .sort({ ...scaledSort, [sortField]: dir === 'asc' ? 1 : -1 })
        .exec()

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
