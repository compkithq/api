const athleteCompetitionRegistration = require('./athleteCompetitionRegistration')
const auth = require('./auth')
const createWorkoutScore = require('./createWorkoutScore')
const updateWorkoutScore = require('./updateWorkoutScore')

module.exports = {
  ...athleteCompetitionRegistration,
  ...auth,
  ...createWorkoutScore,
  ...updateWorkoutScore
}
