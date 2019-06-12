const { rule } = require('graphql-shield')

exports.isAuthenticated = rule()(async (root, args, { userId }) => {
  return userId !== null
})

exports.isAdmin = rule()(async (root, args, { db, userId }) => {
  const { kind } = await db.User.findById(userId)

  return kind === 'Admin'
})

exports.isMe = rule()(async (root, { athleteId }, { userId }) => {
  return athleteId === userId
})
