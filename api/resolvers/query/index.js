const athletes = require('./athletes')
const competitions = require('./competitions')
const leaderboards = require('./leaderboards')
const me = require('./me')
const scoreboards = require('./scoreboards')
const scores = require('./scores')
const venues = require('./venues')
const workouts = require('./workouts')

module.exports = {
  ...athletes,
  ...competitions,
  ...leaderboards,
  ...me,
  ...scoreboards,
  ...scores,
  ...venues,
  ...workouts
}
