const { shield } = require('graphql-shield')
const rules = require('./rules')

module.exports = shield({
  Mutation: {
    addAthletesToFinalsLeaderboard: rules.isAuthenticated,
    athleteFinalsRegistration: rules.isAuthenticated,
    athleteQualifiersRegistration: rules.isAuthenticated,
    createWorkoutScore: rules.isAuthenticated,
    lockCompetitionLeaderboards: rules.isAuthenticated,
    unlockCompetitionLeaderboards: rules.isAuthenticated,
    updateWorkoutScore: rules.isAuthenticated
  },
  Query: {
    getRelevantFinalsLeaderboards: rules.isAuthenticated,
    getRelevantQualifiersLeaderboard: rules.isAuthenticated,
    me: rules.isAuthenticated
  }
})
