const { IncorrectCredentialsError } = require('../../errors/auth')
const { comparePassword, signToken } = require('../../utils')

module.exports = {
  authenticateAdmin: async (root, { email, password }, { db }) => {
    const admin = await db.Admin.findOne({ email })

    if (!admin) throw new IncorrectCredentialsError()

    const passwordsMatch = await comparePassword(password, admin.password)

    if (!passwordsMatch) throw new IncorrectCredentialsError()

    return {
      token: await signToken({ email, id: admin.id })
    }
  },

  authenticateAthlete: async (root, { email, password }, { db }) => {
    const athlete = await db.Athlete.findOne({ email })

    if (!athlete) throw new IncorrectCredentialsError()

    const passwordsMatch = await comparePassword(password, athlete.password)

    if (!passwordsMatch) throw new IncorrectCredentialsError()

    return {
      token: await signToken({ email, id: athlete.id })
    }
  }
}
