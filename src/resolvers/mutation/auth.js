const { IncorrectCredentialsError } = require('../../errors/auth')
const { comparePassword, signToken } = require('../../utils')

module.exports = {
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
