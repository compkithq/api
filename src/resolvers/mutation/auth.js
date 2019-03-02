const { IncorrectCredentialsError } = require('../../errors/auth')
const { comparePassword, signToken } = require('../../utils')

module.exports = {
  authenticate: async (root, { email, password }, { db }) => {
    const user = await db.User.findOne({ email })

    if (!user) throw new IncorrectCredentialsError()

    const passwordsMatch = await comparePassword(password, user.password)

    if (!passwordsMatch) throw new IncorrectCredentialsError()

    return {
      token: await signToken({ email, id: user.id })
    }
  }
}
