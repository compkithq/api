module.exports = {
  lockCompetitionLeaderboards: async (root, { competitionId: id }, { db }) => {
    try {
      const competition = await db.Competition.findById(id)

      return competition.leaderboards.map(async leaderboard => {
        return await db.Leaderboard.findByIdAndUpdate(
          leaderboard,
          {
            $set: { locked: true }
          },
          { new: true }
        )
      })
    } catch (e) {
      return e
    }
  }
}
