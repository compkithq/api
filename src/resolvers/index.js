const Athlete = require('./query/athlete')
const Competition = require('./query/competition')
const FinalsLeaderboard = require('./query/finalsLeaderboard')
const Query = require('./query')
const Mutation = require('./mutation')
const QualifiersLeaderboard = require('./query/qualifiersLeaderboard')
const Score = require('./query/score')
const User = require('./query/user')
const Workout = require('./query/workout')
const Scalar = require('./scalar')

module.exports = {
  Athlete,
  Competition,
  FinalsLeaderboard,
  Leaderboard: {
    __resolveType() {
      return null
    }
  },
  Query,
  QualifiersLeaderboard,
  Me: {
    __resolveType({ kind }) {
      return kind
    }
  },
  Mutation,
  ...Scalar,
  Score,
  User: {
    ...User,

    __resolveType() {
      return null
    }
  },
  Workout
}
