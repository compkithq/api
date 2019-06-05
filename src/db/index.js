const mongoose = require('mongoose')

const Admin = require('./admin')
const Athlete = require('./athlete')
const Competition = require('./competition')
const FinalsLeaderboard = require('./finalsLeaderboard')
const Leaderboard = require('./leaderboard')
const QualifiersLeaderboard = require('./qualifiersLeaderboard')
const Score = require('./score')
const User = require('./user')
const Venue = require('./venue')
const Workout = require('./workout')

const connectToDatabase = async uri => {
  let cachedConnection

  if (cachedConnection) return cachedConnection

  const connection = await mongoose.connect(`mongodb://${uri}`, {
    useNewUrlParser: true
  })

  cachedConnection = connection

  return connection
}

connectToDatabase(process.env.MONGO_URL)

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
