const { and, shield } = require('graphql-shield')
const rules = require('./rules')

module.exports = shield({
  Mutation: {
    addAthletesToFinalsLeaderboard: and(rules.isAuthenticated, rules.isAdmin),
    athleteFinalsRegistration: rules.isAuthenticated,
    athleteQualifiersRegistration: rules.isAuthenticated,
    createWorkoutScore: rules.isAuthenticated,
    lockCompetitionQualifiersLeaderboards: and(
      rules.isAuthenticated,
      rules.isAdmin
    ),
    unlockCompetitionQualifiersLeaderboards: and(
      rules.isAuthenticated,
      rules.isAdmin
    ),
    updateWorkoutScore: rules.isAuthenticated
  },
  Query: {
    getRelevantFinalsLeaderboards: rules.isAuthenticated,
    getRelevantQualifiersLeaderboard: rules.isAuthenticated,
    me: rules.isAuthenticated
  }
})
