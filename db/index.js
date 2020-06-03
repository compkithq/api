const mongoose = require('mongoose')

const { Admin } = require('./admin')
const { Athlete } = require('./athlete')
const { Competition } = require('./competition')
const { FinalsLeaderboard } = require('./finalsLeaderboard')
const { Leaderboard } = require('./leaderboard')
const { QualifiersLeaderboard } = require('./qualifiersLeaderboard')
const { Score } = require('./score')
const { User } = require('./user')
const { Venue } = require('./venue')
const { Workout } = require('./workout')

mongoose.connect(process.env.MONGO_URL, {
  dbName: 'fme-production',
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = {
  Admin,
  Athlete,
  Competition,
  FinalsLeaderboard,
  Leaderboard,
  QualifiersLeaderboard,
  Score,
  User,
  Venue,
  Workout
}
