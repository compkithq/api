const athleteCompetitionRegistration = require('./athleteCompetitionRegistration')
const auth = require('./auth')
const createWorkoutScore = require('./createWorkoutScore')
const lockCompetitionLeaderboards = require('./lockCompetitionLeaderboards')
const unlockCompetitionLeaderboards = require('./unlockCompetitionLeaderboards')
const updateWorkoutScore = require('./updateWorkoutScore')

module.exports = {
  ...athleteCompetitionRegistration,
  ...auth,
  ...createWorkoutScore,
  ...lockCompetitionLeaderboards,
  ...unlockCompetitionLeaderboards,
  ...updateWorkoutScore
}
