const crypto = require('crypto')

const { IncorrectCredentialsError } = require('../../errors/auth')

module.exports = {
  forgotPassword: async (root, { email }, { db }) => {
    try {
      const user = await db.User.findOne({ email })

      if (!user) throw new IncorrectCredentialsError()

      const resetPasswordToken = crypto.randomBytes(20).toString('hex')

      user.set({
        resetPasswordToken,
        resetPasswordExpires: Date.now() + 3600000
      })

      return await user.save()
    } catch (e) {
      return e
    }
  }
}
