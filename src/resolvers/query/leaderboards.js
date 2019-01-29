module.exports = {
  leaderboards: async (root, { competitionId }, { db }) => {
    try {
      const leaderboards = await db.Leaderboard.find({
        competition: { $in: competitionId }
      }).exec()

      return leaderboards
    } catch (e) {
      return e
    }
  },

  leaderboard: async (root, { id }, { db }) => {
    try {
      const leaderboard = await db.Leaderboard.findById(id).exec()

      return leaderboard
    } catch (e) {
      return e
    }
  },

  getLeaderboardTickets: async (
    root,
    { leaderboard: { age, competition, division, gender } },
    { db, stripe }
  ) => {
    try {
      let category

      switch (true) {
        case age < 35:
          category = 'under-35'
          break
        case age < 45:
          category = '35-44'
          break
        case age >= 45:
        default:
          category = 'over-44'
      }

      const { tickets: ids } = await db.Leaderboard.findOne({
        category,
        competition,
        division,
        gender
      })

      const { data: tickets } = await stripe.skus.list({ ids: [...ids] })

      return tickets.map(({ attributes, inventory, ...rest }) => ({
        ...rest,
        ...attributes,
        ...inventory
      }))
    } catch (e) {
      return e
    }
  }
}
