const addAthletesToFinalsLeaderboard = require('./addAthletesToFinalsLeaderboard')
const athleteFinalsRegistration = require('./athleteFinalsRegistration')
const athleteQualifiersRegistration = require('./athleteQualifiersRegistration')
const auth = require('./auth')
const createWorkoutScore = require('./createWorkoutScore')
const lockCompetitionLeaderboards = require('./lockCompetitionLeaderboards')
const unlockCompetitionLeaderboards = require('./unlockCompetitionLeaderboards')
const updateWorkoutScore = require('./updateWorkoutScore')

module.exports = {
  ...addAthletesToFinalsLeaderboard,
  ...athleteFinalsRegistration,
  ...athleteQualifiersRegistration,
  ...auth,
  ...createWorkoutScore,
  ...lockCompetitionLeaderboards,
  ...unlockCompetitionLeaderboards,
  ...updateWorkoutScore
}
