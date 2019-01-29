const athleteCompetitionRegistration = require('./athleteCompetitionRegistration')
const auth = require('./auth')
const createWorkoutScore = require('./createWorkoutScore')

module.exports = {
  ...athleteCompetitionRegistration,
  ...auth,
  ...createWorkoutScore
}
