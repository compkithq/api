const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')
const isEmail = require('validator/lib/isEmail')

exports.Email = new GraphQLScalarType({
  name: 'Email',
  description: 'Email custom scalar type',
  parseValue(value) {
    if (!isEmail(value))
      throw new TypeError(`Value is not a valid email address: ${value}`)

    return value
  },
  serialize(value) {
    if (!isEmail(value))
      throw new TypeError(`Value is not a valid email address: ${value}`)

    return value
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as email addresses but got a: ${ast.kind}`
      )
    }

    if (!isEmail(ast.value)) {
      throw new TypeError(`Value is not a valid email address: ${ast.value}`)
    }

    return ast.value
  }
})
