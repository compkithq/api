const crypto = require('crypto')

const { InvalidEmailError } = require('../../errors/auth')
const { isValidEmail } = require('../../utils')

module.exports = {
  forgotPassword: async (root, { email }, { db, postmark }) => {
    try {
      if (!isValidEmail(email)) throw new InvalidEmailError()

      const user = await db.User.findOne({ email })

      if (!user) throw new InvalidEmailError()

      const resetPasswordToken = crypto.randomBytes(20).toString('hex')

      user.set({
        resetPasswordToken,
        resetPasswordExpires: Date.now() + 3600000
      })

      await user.save()

      await postmark.sendEmailWithTemplate({
        From: 'team@firstmeanseverything.com',
        TemplateId: '8579087',
        To: email,
        TemplateModel: {
          name: user.name,
          resetURL: `https://firstmeanseverything.com/reset?token=${resetPasswordToken}`
        }
      })

      return user
    } catch (e) {
      return e
    }
  }
}
