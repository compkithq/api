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

  getRelevantLeaderboard: async (
    root,
    { criteria: { age, competition, division, gender } },
    { db }
  ) => {
    try {
      const leaderboard = await db.Leaderboard.findOne({
        category: athleteCompetitionCategory({ age }),
        competition,
        division,
        gender
      })

      return leaderboard
    } catch (e) {
      return e
    }
  }
}
