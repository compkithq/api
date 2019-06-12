module.exports = {
  athletes: async (root, { offset, limit }, { db }) => {
    try {
      const athletes = await db.Athlete.find({})
        .limit(limit)
        .skip(offset)
        .exec()

      return athletes
    } catch (e) {
      return e
    }
  },

  athlete: async (root, { id }, { db }) => {
    try {
      const athlete = await db.Athlete.findById(id).exec()

      return athlete
    } catch (e) {
      return e
    }
  }
}
