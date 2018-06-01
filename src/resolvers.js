module.exports = {
  Query: {
    competitions: async (root, { limit, offset }, { db }) => {
      try {
        const competitions = await db.Competition.find({})
          .limit(limit)
          .skip(offset)
          .exec();

        return competitions;
      } catch (e) {
        return e;
      }
    },

    competition: async (root, { id }, { db }) => {
      try {
        const competition = await db.Competition.findById(id).exec();

        return competition;
      } catch (e) {
        return e;
      }
    },

    venues: async (root, { limit, offset }, { db }) => {
      try {
        const venues = await db.Venue.find({})
          .limit(limit)
          .skip(offset)
          .exec();

        return venues;
      } catch (e) {
        return e;
      }
    },

    venue: async (root, { id }, { db }) => {
      try {
        const venue = await db.Venue.findById(id).exec();

        return venue;
      } catch (e) {
        return e;
      }
    }
  },

  Competition: {
    venue: async ({ venue: id }, args, { loaders: { venueLoader } }) => {
      try {
        const venue = await venueLoader.load(id);

        return venue;
      } catch (e) {
        return e;
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
        const competitions = await competitionLoader.loadMany(ids);

        return competitions;
      } catch (e) {
        return e;
      }
    }
  }
};
