const competitions = require('./competitions')
const leaderboards = require('./leaderboards')
const scores = require('./scores')
const venues = require('./venues')
const workouts = require('./workouts')

module.exports = {
  ...competitions,
  ...leaderboards,
  ...scores,
  ...venues,
  ...workouts
}
