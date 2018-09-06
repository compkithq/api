const competitions = require('./competitions')
const leaderboards = require('./leaderboards')
const venues = require('./venues')

module.exports = {
  ...competitions,
  ...leaderboards,
  ...venues
}
