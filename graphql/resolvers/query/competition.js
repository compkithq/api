module.exports = {
  finalsLeaderboards: async (
    { finalsLeaderboards: ids },
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

  qualifiersLeaderboards: async (
    { qualifiersLeaderboards: ids },
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

  tickets: async ({ tickets: ids }, args, { stripe }) => {
    try {
      const { data: tickets } = await stripe.skus.list({ ids: [...ids] })

      return tickets.map(({ attributes, inventory, ...rest }) => ({
        ...rest,
        ...attributes,
        ...inventory
      }))
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
