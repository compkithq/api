module.exports = {
  me: async (root, args, { db, userId: id }) => {
    try {
      const athlete = await db.Athlete.findById(id).exec()

      return athlete
    } catch (e) {
      return e
    }
  }
}
