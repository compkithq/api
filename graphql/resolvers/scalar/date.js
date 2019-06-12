const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

exports.Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(parseInt(value, 10))
  },
  serialize(value) {
    return value.getTime()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  }
})
