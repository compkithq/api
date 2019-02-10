const { shield } = require('graphql-shield')
const rules = require('./rules')

module.exports = shield({
  Query: {
    me: rules.isAuthenticated
  }
})
