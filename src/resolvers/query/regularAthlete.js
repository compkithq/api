module.exports = {
  leaderboards: async (
    { leaderboards: ids },
    args,
    { loaders: { leaderboardLoader } }
  ) => {
    try {
      const leaderboards = await leaderboardLoader.loadMany(ids)

      return leaderboards
    } catch (e) {
      return e
    }
  }
}
