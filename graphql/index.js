const { ApolloServer } = require('apollo-server-micro')
const db = require('./db')
const { makeExecutableSchema } = require('graphql-tools')
const { applyMiddleware } = require('graphql-middleware')

const resolvers = require('./resolvers')
const loaders = require('./loaders')
const permissions = require('./permissions')
const typeDefs = require('./typeDefs')
const { getUserId, withCors } = require('./utils')

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
      inheritResolversFromInterfaces: true
    }),
    permissions
  ),
  context: async req => ({
    ...req,
    db,
    loaders,
    userId: await getUserId({ ...req })
  }),
  introspection: true,
  playground: true
})

module.exports = withCors(server.createHandler({ path: '/graphql' }))
