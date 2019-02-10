const { rule } = require('graphql-shield')

exports.isAuthenticated = rule()(async (root, args, { userId }) => {
  return userId !== null
})
