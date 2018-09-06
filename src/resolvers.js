const {
  IncorrectCredentialsError,
  InvalidEmailError
} = require('./errors/auth')
const { comparePassword, isValidEmail, signToken } = require('./utils')

module.exports = {
  Mutation: {
    authenticate: async (root, { email, password }, { db }) => {
      if (!isValidEmail(email)) throw new InvalidEmailError()

      const user = await db.User.findOne({ email })

      if (!user) throw new IncorrectCredentialsError()

      const passwordsMatch = await comparePassword(password, user.password)

      if (!passwordsMatch) throw new IncorrectCredentialsError()

      return {
        token: signToken({ email, id: user.id })
      }
    }
  },

  Query: {
    competitions: async (root, { limit, offset }, { db }) => {
      try {
        const competitions = await db.Competition.find({})
          .limit(limit)
          .skip(offset)
          .exec()

        return competitions
      } catch (e) {
        return e
      }
    },

    competition: async (root, { id }, { db }) => {
      try {
        const competition = await db.Competition.findById(id).exec()

        return competition
      } catch (e) {
        return e
      }
    },

    leaderboards: async (root, { competitionId }, { db }) => {
      try {
        const leaderboards = await db.Leaderboard.find({
          competition: { $in: competitionId }
        }).exec()

        return leaderboards
      } catch (e) {
        return e
      }
    },

    venues: async (root, { limit, offset }, { db }) => {
      try {
        const venues = await db.Venue.find({})
          .limit(limit)
          .skip(offset)
          .exec()

        return venues
      } catch (e) {
        return e
      }
    },

    venue: async (root, { id }, { db }) => {
      try {
        const venue = await db.Venue.findById(id).exec()

        return venue
      } catch (e) {
        return e
      }
    }
  },

  Competition: {
    leaderboards: async (
      { leaderboards: ids },
      args,
      { loaders: { leaderboardLoader } }
    ) => {
      try {
        const leaderboard = await leaderboardLoader.loadMany(ids)

        return leaderboard
      } catch (e) {
        return e
      }
    },

    venue: async ({ venue: id }, args, { loaders: { venueLoader } }) => {
      try {
        const venue = await venueLoader.load(id)

        return venue
      } catch (e) {
        return e
      }
    }
  },

  Leaderboard: {
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
    }
  },

  Venue: {
    competitions: async (
      { competitions: ids },
      args,
      { loaders: { competitionLoader } }
    ) => {
      try {
        const competitions = await competitionLoader.loadMany(ids)

        return competitions
      } catch (e) {
        return e
      }
    }
  }
}
