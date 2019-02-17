module.exports = {
  me: async (root, args, { db, userId: id }) => {
    try {
      const user = await db.User.findById(id).exec()

      return user
    } catch (e) {
      return e
    }
  }
}
