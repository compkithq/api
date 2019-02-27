const { rule } = require('graphql-shield')

exports.isAuthenticated = rule()(async (root, args, { userId }) => {
  return userId !== null
})

exports.isAdmin = rule()(async (root, args, { db, userId }) => {
  try {
    const { kind } = await db.User.findById(userId)

    return kind === 'Admin'
  } catch (e) {
    return e
  }
})
