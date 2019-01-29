const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const Athlete = require('./query/athlete')
const Competition = require('./query/competition')
const Leaderboard = require('./query/leaderboard')
const Query = require('./query')
const Mutation = require('./mutation')
const RegularAthlete = require('./query/regularAthlete')
const Score = require('./query/score')
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
  Leaderboard,
  Query,
  Mutation,
  RegularAthlete,
  Score,
  Workout
}
