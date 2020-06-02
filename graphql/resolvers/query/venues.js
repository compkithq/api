module.exports = {
  venues: async (root, { limit, offset }, { db }) => {
    try {
      const venues = await db.Venue.find({}).limit(limit).skip(offset).exec()

      return venues
    } catch (e) {
      return e
    }
  },

  venue: async (root, { id }, { db }) => {
    try {
      const venue = await db.Venue.findById(id).exec()

      return venue
    } catch (e) {
      return e
    }
  }
}
