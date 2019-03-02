const Athlete = require('./query/athlete')
const Competition = require('./query/competition')
const FinalsLeaderboard = require('./query/finalsLeaderboard')
const Query = require('./query')
const Mutation = require('./mutation')
const QualifiersLeaderboard = require('./query/qualifiersLeaderboard')
const RegularAthlete = require('./query/regularAthlete')
const Score = require('./query/score')
const User = require('./query/user')
const Workout = require('./query/workout')
const Scalar = require('./scalar')

module.exports = {
  Athlete: {
    ...Athlete,

    __resolveType() {
      return null
    }
  },
  Competition,
  FinalsLeaderboard,
  Leaderboard: {
    __resolveType() {
      return null
    }
  },
  Query,
  QualifiersLeaderboard,
  Mutation,
  RegularAthlete,
  ...Scalar,
  Score,
  User,
  Workout
}
