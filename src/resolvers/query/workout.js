module.exports = {
  leaderboard: async (
    { leaderboard: id },
    args,
    { loaders: { leaderboardLoader } }
  ) => {
    try {
      const leaderboard = await leaderboardLoader.load(id)

      return leaderboard
    } catch (e) {
      return e
    }
  }
}
