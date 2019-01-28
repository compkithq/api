module.exports = {
  competitions: async (root, { limit, offset }, { db }) => {
    try {
      const competitions = await db.Competition.find({})
        .limit(limit)
        .skip(offset)
        .exec()

      return competitions
    } catch (e) {
      return e
    }
  },

  competition: async (root, { id }, { db }) => {
    try {
      const competition = await db.Competition.findById(id).exec()

      return competition
    } catch (e) {
      return e
    }
  },

  getCompetitionBySlug: async (root, { slug }, { db }) => {
    try {
      const competition = await db.Competition.findOne({
        slug: { $eq: slug }
      }).exec()

      return competition
    } catch (e) {
      return e
    }
  }
}
