const { InvalidResetError } = require('../../errors/auth')
const { hashPassword } = require('../../utils')

module.exports = {
  resetPassword: async (root, { password, token }, { db }) => {
    try {
      const user = await db.User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      })

      if (!user) throw new InvalidResetError()

      user.set({
        password: await hashPassword(password),
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined
      })

      await user.save()

      return user
    } catch (e) {
      return e
    }
  }
}
