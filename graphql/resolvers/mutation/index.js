const addAthletesToFinalsLeaderboard = require('./addAthletesToFinalsLeaderboard')
const athleteFinalsRegistration = require('./athleteFinalsRegistration')
const athleteQualifiersRegistration = require('./athleteQualifiersRegistration')
const auth = require('./auth')
const createAthleteAccount = require('./createAthleteAccount')
const createWorkoutScore = require('./createWorkoutScore')
const forgotPassword = require('./forgotPassword')
const lockCompetitionLeaderboards = require('./lockCompetitionLeaderboards')
const resetPassword = require('./resetPassword')
const spectatorCompetitionRegistration = require('./spectatorCompetitionRegistration')
const unlockCompetitionLeaderboards = require('./unlockCompetitionLeaderboards')
const updateAthleteProfile = require('./updateAthleteProfile')
const updateWorkoutScore = require('./updateWorkoutScore')

module.exports = {
  ...addAthletesToFinalsLeaderboard,
  ...athleteFinalsRegistration,
  ...athleteQualifiersRegistration,
  ...auth,
  ...createAthleteAccount,
  ...createWorkoutScore,
  ...forgotPassword,
  ...lockCompetitionLeaderboards,
  ...resetPassword,
  ...spectatorCompetitionRegistration,
  ...unlockCompetitionLeaderboards,
  ...updateAthleteProfile,
  ...updateWorkoutScore
}
