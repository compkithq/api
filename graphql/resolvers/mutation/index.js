const addAthletesToFinalsLeaderboard = require('./addAthletesToFinalsLeaderboard')
const auth = require('./auth')
const createAthleteAccount = require('./createAthleteAccount')
const createWorkoutScore = require('./createWorkoutScore')
const forgotPassword = require('./forgotPassword')
const lockCompetitionLeaderboards = require('./lockCompetitionLeaderboards')
const resetPassword = require('./resetPassword')
const unlockCompetitionLeaderboards = require('./unlockCompetitionLeaderboards')
const updateAthleteProfile = require('./updateAthleteProfile')
const updateWorkoutScore = require('./updateWorkoutScore')

module.exports = {
  ...addAthletesToFinalsLeaderboard,
  ...auth,
  ...createAthleteAccount,
  ...createWorkoutScore,
  ...forgotPassword,
  ...lockCompetitionLeaderboards,
  ...resetPassword,
  ...unlockCompetitionLeaderboards,
  ...updateAthleteProfile,
  ...updateWorkoutScore
}
