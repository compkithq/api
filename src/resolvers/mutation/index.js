const auth = require('./auth')
const createWorkoutScore = require('./createWorkoutScore')

module.exports = {
  ...auth,
  ...createWorkoutScore
}
