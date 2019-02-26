const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

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

module.exports = {
  Athlete: {
    ...Athlete,

    __resolveType() {
      return null
    }
  },
  Competition,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value)
      }
      return null
    }
  }),
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
  Score,
  User,
  Workout
}
