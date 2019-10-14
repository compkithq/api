module.exports = {
  addAthletesToFinalsLeaderboard: async (
    root,
    { leaderboardId, athletes: ids },
    { db }
  ) => {
    try {
      return await db.FinalsLeaderboard.findByIdAndUpdate(leaderboardId, {
        $push: { qualifiedAthletes: { $each: ids } }
      }).exec()
    } catch (e) {
      return e
    }
  }
}
