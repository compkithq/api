module.exports = {
  competition: async (
    { competition: id },
    args,
    { loaders: { competitionLoader } }
  ) => {
    try {
      const competition = await competitionLoader.load(id)

      return competition
    } catch (e) {
      return e
    }
  },

  workouts: async ({ workouts: ids }, args, { loaders: { workoutLoader } }) => {
    try {
      const workout = await workoutLoader.loadMany(ids)

      return workout
    } catch (e) {
      return e
    }
  }
}
