module.exports = {
  athleteQualifiersRegistration: async (
    root,
    { registration: { currency, email, leaderboard, ticket, token } },
    { db, postmark, stripe }
  ) => {
    try {
      const createStripeCustomer = async ({ athlete }) => {
        const { id } = await stripe.customers.create({ email })

        athlete.set({ stripeID: id })
        await athlete.save()

        return id
      }

      const { id: source } = await stripe.sources.create({
        token,
        type: 'card',
        usage: 'single_use'
      })

      let athlete = await db.Athlete.findOne({ email }).exec()

      const customer = athlete.stripeID
        ? athlete.stripeID
        : await createStripeCustomer({ athlete })

      const { id } = await stripe.orders.create({
        currency,
        customer,
        items: [
          {
            type: 'sku',
            parent: ticket,
            quantity: 1
          }
        ]
      })

      await stripe.orders.pay(id, { customer, email, source })

      const {
        competition: { name: competitionName },
        name: leaderboardName
      } = await db.QualifiersLeaderboard.findByIdAndUpdate(
        leaderboard,
        { $push: { athletes: athlete } },
        { new: true }
      )
        .populate('competition')
        .exec()

      athlete = await db.Athlete.findByIdAndUpdate(
        athlete,
        { $push: { qualifiersLeaderboards: leaderboard } },
        { new: true }
      ).exec()

      await postmark.sendEmailWithTemplate({
        From: 'team@firstmeanseverything.com',
        TemplateId: '8579086',
        To: email,
        TemplateModel: {
          competitionName,
          leaderboardName,
          name: athlete.name
        }
      })

      return athlete
    } catch (e) {
      return e
    }
  }
}
