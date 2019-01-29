const athleteCompetitionCategory = require('../../utils/athlete-competition-category')

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
      const { tickets: ids } = await db.Leaderboard.findOne({
        category: athleteCompetitionCategory({ age }),
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
