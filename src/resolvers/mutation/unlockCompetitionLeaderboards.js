module.exports = {
  unlockCompetitionLeaderboards: async (
    root,
    { competitionId: id },
    { db }
  ) => {
    try {
      const competition = await db.Competition.findById(id)

      return competition.leaderboards.map(async leaderboard => {
        return await db.Leaderboard.findByIdAndUpdate(
          leaderboard,
          {
            $set: { locked: false }
          },
          { new: true }
        )
      })
    } catch (e) {
      return e
    }
  }
}
