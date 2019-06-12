module.exports = {
  spectatorCompetitionRegistration: async (
    root,
    { registration: { currency, competition, email, quantity, ticket, token } },
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

      const athlete = await db.Athlete.findOne({ email }).exec()

      let customer

      if (athlete) {
        customer = athlete.stripeID
          ? athlete.stripeID
          : await createStripeCustomer({ athlete })
      }

      const { id } = await stripe.orders.create({
        currency,
        items: [
          {
            type: 'sku',
            parent: ticket,
            quantity
          }
        ],
        ...(customer && { customer })
      })

      await stripe.orders.pay(id, {
        email,
        source,
        ...(customer && { customer })
      })

      const {
        name: competitionName,
        venue: { address: venueAddress }
      } = await db.Competition.findById(competition)
        .populate('venue')
        .exec()

      await postmark.sendEmailWithTemplate({
        From: 'team@firstmeanseverything.com',
        TemplateId: '10604137',
        To: email,
        TemplateModel: {
          competitionName,
          quantity,
          venueAddress
        }
      })

      return { id }
    } catch (e) {
      return e
    }
  }
}
