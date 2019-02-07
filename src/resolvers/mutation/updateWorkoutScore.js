module.exports = {
  updateWorkoutScore: async (root, { score: { score, value } }, { db }) => {
    try {
      return await db.Score.findByIdAndUpdate(
        score,
        { $set: { value, updatedAt: new Date() } },
        { new: true }
      )
    } catch (e) {
      return e
    }
  }
}
