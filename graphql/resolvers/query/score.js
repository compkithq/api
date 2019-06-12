module.exports = {
  athlete: async ({ athlete: id }, args, { loaders: { athleteLoader } }) => {
    try {
      const athlete = await athleteLoader.load(id)

      return athlete
    } catch (e) {
      return e
    }
  },

  meta: async ({ createdAt, updatedAt }, args, ctx) => {
    try {
      return { createdAt, updatedAt }
    } catch (e) {
      return e
    }
  },

  workout: async ({ workout: id }, args, { loaders: { workoutLoader } }) => {
    try {
      const workout = await workoutLoader.load(id)

      return workout
    } catch (e) {
      return e
    }
  }
}
