const competitions = require('./competitions')
const leaderboards = require('./leaderboards')
const venues = require('./venues')
const workouts = require('./workouts')

module.exports = {
  ...competitions,
  ...leaderboards,
  ...venues,
  ...workouts
}
