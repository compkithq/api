module.exports = {
  leaderboards: async (root, { competitionId }, { db }) => {
    try {
      const leaderboards = await db.Leaderboard.find({
        competition: { $in: competitionId }
      }).exec()

      return leaderboards
    } catch (e) {
      return e
    }
  }
}
