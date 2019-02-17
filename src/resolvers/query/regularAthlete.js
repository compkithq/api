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
  },

  scores: async ({ scores: ids }, args, { loaders: { scoreLoader } }) => {
    try {
      const scores = await scoreLoader.loadMany(ids)

      return scores
    } catch (e) {
      return e
    }
  }
}
