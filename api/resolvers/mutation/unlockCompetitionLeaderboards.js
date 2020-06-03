module.exports = {
  unlockCompetitionQualifiersLeaderboards: async (
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
