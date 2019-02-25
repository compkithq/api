const athleteCompetitionAge = require('../../utils/athlete-competition-age')
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
    { criteria: { competition, division } },
    { db, userId }
  ) => {
    try {
      const { dateOfBirth, gender } = await db.Athlete.findById(userId)

      const { finalsDate } = await db.Competition.findById(competition)

      const leaderboard = await db.Leaderboard.findOne({
        category: athleteCompetitionCategory({
          age: athleteCompetitionAge({ finalsDate, dateOfBirth })
        }),
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
