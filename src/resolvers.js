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
    }
  },

  Competition: {
    venue: async ({ venue: id }, args, { loaders }) => {
      try {
        const venue = await loaders.venueLoader.load(id);

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
