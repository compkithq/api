module.exports = {
  lockCompetitionQualifiersLeaderboards: async (
    root,
    { competitionId: id },
    { db }
  ) => {
    try {
      const { qualifiersLeaderboards } = await db.Competition.findById(id)

      return qualifiersLeaderboards.map(async (leaderboard) => {
        return await db.QualifiersLeaderboard.findByIdAndUpdate(
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
