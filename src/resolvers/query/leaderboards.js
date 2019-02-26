const athleteCompetitionAge = require('../../utils/athlete-competition-age')
const athleteCompetitionCategory = require('../../utils/athlete-competition-category')

module.exports = {
  competitionQualifiersLeaderboards: async (
    root,
    { competitionId },
    { db }
  ) => {
    try {
      const leaderboards = await db.QualifiersLeaderboard.find({
        competition: { $in: competitionId }
      }).exec()

      return leaderboards
    } catch (e) {
      return e
    }
  },

  competitionFinalsLeaderboards: async (root, { competitionId }, { db }) => {
    try {
      const leaderboards = await db.FinalsLeaderboard.find({
        competition: { $in: competitionId }
      }).exec()

      return leaderboards
    } catch (e) {
      return e
    }
  },

  getRelevantQualifiersLeaderboard: async (
    root,
    { criteria: { competition, division } },
    { db, userId }
  ) => {
    try {
      const { dateOfBirth, gender } = await db.Athlete.findById(userId)

      const { finalsDate } = await db.Competition.findById(competition)

      const leaderboard = await db.QualifiersLeaderboard.findOne({
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
