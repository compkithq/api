const {
  IncorrectCredentialsError,
  InvalidEmailError
} = require('../../errors/auth')
const { comparePassword, isValidEmail, signToken } = require('../../utils')

module.exports = {
  authenticate: async (root, { email, password }, { db }) => {
    if (!isValidEmail(email)) throw new InvalidEmailError()

    const user = await db.User.findOne({ email })

    if (!user) throw new IncorrectCredentialsError()

    const passwordsMatch = await comparePassword(password, user.password)

    if (!passwordsMatch) throw new IncorrectCredentialsError()

    return {
      token: signToken({ email, id: user.id })
    }
  }
}
