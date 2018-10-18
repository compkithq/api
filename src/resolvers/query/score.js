module.exports = {
  workout: async ({ workout: id }, args, { loaders: { workoutLoader } }) => {
    try {
      const workout = await workoutLoader.load(id)

      return workout
    } catch (e) {
      return e
    }
  }
}
