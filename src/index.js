const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')

const postmark = require('postmark')
const stripe = require('stripe')(process.env.STRIPE_KEY)

const db = require('./db')
const resolvers = require('./resolvers')
const loaders = require('./loaders')
const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db,
    loaders,
    postmark: new postmark.ServerClient(process.env.POSTMARK_KEY),
    stripe
  }),
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
