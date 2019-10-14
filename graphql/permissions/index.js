const { and, or, shield } = require('graphql-shield')
const rules = require('./rules')

module.exports = shield({
  Mutation: {
    addAthletesToFinalsLeaderboard: and(rules.isAuthenticated, rules.isAdmin),
    createWorkoutScore: rules.isAuthenticated,
    lockCompetitionQualifiersLeaderboards: and(
      rules.isAuthenticated,
      rules.isAdmin
    ),
    unlockCompetitionQualifiersLeaderboards: and(
      rules.isAuthenticated,
      rules.isAdmin
    ),
    updateAthleteProfile: and(
      rules.isAuthenticated,
      or(rules.isAdmin, rules.isMe)
    ),
    updateWorkoutScore: rules.isAuthenticated
  },
  Query: {
    athlete: and(rules.isAuthenticated, or(rules.isMe, rules.isAdmin)),
    athletes: and(rules.isAuthenticated, rules.isAdmin),
    getRelevantFinalsLeaderboards: rules.isAuthenticated,
    getRelevantQualifiersLeaderboard: rules.isAuthenticated,
    me: rules.isAuthenticated
  }
})
