const addAthletesToFinalsLeaderboard = require('./addAthletesToFinalsLeaderboard')
const athleteFinalsRegistration = require('./athleteFinalsRegistration')
const athleteQualifiersRegistration = require('./athleteQualifiersRegistration')
const auth = require('./auth')
const createWorkoutScore = require('./createWorkoutScore')
const forgotPassword = require('./forgotPassword')
const lockCompetitionLeaderboards = require('./lockCompetitionLeaderboards')
const resetPassword = require('./resetPassword')
const unlockCompetitionLeaderboards = require('./unlockCompetitionLeaderboards')
const updateWorkoutScore = require('./updateWorkoutScore')

module.exports = {
  ...addAthletesToFinalsLeaderboard,
  ...athleteFinalsRegistration,
  ...athleteQualifiersRegistration,
  ...auth,
  ...createWorkoutScore,
  ...forgotPassword,
  ...lockCompetitionLeaderboards,
  ...resetPassword,
  ...unlockCompetitionLeaderboards,
  ...updateWorkoutScore
}
