const { adminLoader } = require('../db/admin')
const { athleteLoader } = require('../db/athlete')
const { competitionLoader } = require('../db/competition')
const { finalsLeaderboardLoader } = require('../db/finalsLeaderboard')
const { qualifiersLeaderboardLoader } = require('../db/qualifiersLeaderboard')
const { scoreLoader } = require('../db/score')
const { venueLoader } = require('../db/venue')
const { workoutLoader } = require('../db/workout')

module.exports = {
  adminLoader: adminLoader(),
  athleteLoader: athleteLoader(),
  competitionLoader: competitionLoader(),
  finalsLeaderboardLoader: finalsLeaderboardLoader(),
  qualifiersLeaderboardLoader: qualifiersLeaderboardLoader(),
  scoreLoader: scoreLoader(),
  venueLoader: venueLoader(),
  workoutLoader: workoutLoader()
}
