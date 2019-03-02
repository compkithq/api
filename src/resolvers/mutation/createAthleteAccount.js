const { IncorrectCredentialsError } = require('../../errors/auth')
const { hashPassword } = require('../../utils')

module.exports = {
  createAthleteAccount: async (
    root,
    { athlete: { email, name, password, ...rest } },
    { db, postmark }
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

      await newAthlete.save()

      await postmark.sendEmailWithTemplate({
        From: 'team@firstmeanseverything.com',
        TemplateId: '8578478',
        To: email,
        TemplateModel: {
          email,
          name
        }
      })

      return newAthlete
    } catch (e) {
      return e
    }
  }
}
