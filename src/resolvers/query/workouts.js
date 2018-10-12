module.exports = {
  workouts: async (root, { leaderboardId }, { db }) => {
    try {
      const workouts = await db.Workout.find({
        leaderboard: { $in: leaderboardId }
      }).exec()

      return workouts
    } catch (e) {
      return e
    }
  },

  workout: async (root, { id }, { db }) => {
    try {
      const workout = await db.Workout.findById(id).exec()

      return workout
    } catch (e) {
      return e
    }
  }
}
