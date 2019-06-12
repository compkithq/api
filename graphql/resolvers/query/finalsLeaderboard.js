module.exports = {
  athletes: async ({ athletes: ids }, args, { loaders: { athleteLoader } }) => {
    try {
      const athletes = await athleteLoader.loadMany(ids)

      return athletes
    } catch (e) {
      return e
    }
  },

  competition: async (
    { competition: id },
    args,
    { loaders: { competitionLoader } }
  ) => {
    try {
      const competition = await competitionLoader.load(id)

      return competition
    } catch (e) {
      return e
    }
  },

  meta: async ({ athletes, qualifiedAthletes }, args, ctx) => {
    try {
      return {
        athletesCount: athletes.length,
        qualifiedAthletesCount: qualifiedAthletes.count
      }
    } catch (e) {
      return e
    }
  },

  qualifiedAthletes: async (
    { qualifiedAthletes: ids },
    args,
    { loaders: { athleteLoader } }
  ) => {
    try {
      const athletes = await athleteLoader.loadMany(ids)

      return athletes
    } catch (e) {
      return e
    }
  },

  tickets: async ({ tickets: ids }, args, { stripe }) => {
    try {
      const { data: tickets } = await stripe.skus.list({ ids: [...ids] })

      return tickets.map(({ attributes, inventory, ...rest }) => ({
        ...rest,
        ...attributes,
        ...inventory
      }))
    } catch (e) {
      return e
    }
  },

  workouts: async ({ workouts: ids }, args, { loaders: { workoutLoader } }) => {
    try {
      const workouts = await workoutLoader.loadMany(ids)

      return workouts
    } catch (e) {
      return e
    }
  }
}
