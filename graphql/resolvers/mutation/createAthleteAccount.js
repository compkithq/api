const { IncorrectCredentialsError } = require('../../errors/auth')
const { hashPassword } = require('../../utils')

module.exports = {
  createAthleteAccount: async (
    root,
    { athlete: { email, name, password, ...rest } },
    { db }
  ) => {
    try {
      const existingAthlete = await db.Athlete.findOne({ email })

      if (existingAthlete) throw new IncorrectCredentialsError()

      const newAthlete = await new db.Athlete({
        email,
        name,
        password: await hashPassword(password),
        ...rest
      })

      return await newAthlete.save()
    } catch (e) {
      return e
    }
  }
}
