module.exports = {
  finalsLeaderboards: async (
    { finalsLeaderboards: ids },
    args,
    { loaders: { finalsLeaderboardLoader } }
  ) => {
    try {
      const leaderboards = await finalsLeaderboardLoader.loadMany(ids)

      return leaderboards
    } catch (e) {
      return e
    }
  },

  qualifiersLeaderboards: async (
    { qualifiersLeaderboards: ids },
    args,
    { loaders: { qualifiersLeaderboardLoader } }
  ) => {
    try {
      const leaderboards = await qualifiersLeaderboardLoader.loadMany(ids)

      return leaderboards
    } catch (e) {
      return e
    }
  },

  venue: async ({ venue: id }, args, { loaders: { venueLoader } }) => {
    try {
      const venue = await venueLoader.load(id)

      return venue
    } catch (e) {
      return e
    }
  }
}
