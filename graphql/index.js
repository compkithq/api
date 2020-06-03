const { ApolloServer } = require('apollo-server')
const db = require('./db')
const { makeExecutableSchema } = require('graphql-tools')
const { applyMiddleware } = require('graphql-middleware')

const resolvers = require('./resolvers')
const loaders = require('./loaders')
const permissions = require('./permissions')
const typeDefs = require('./typeDefs')
const { getUserId } = require('./utils')

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
      inheritResolversFromInterfaces: true
    }),
    permissions
  ),
  context: async (req) => ({
    ...req,
    db,
    loaders,
    userId: await getUserId({ ...req })
  }),
  introspection: true,
  playground: true
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
