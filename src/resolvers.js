module.exports = {
  Query: {
    competitions: async (root, args, ctx) => {
      const { limit, offset } = args;
      const { db } = ctx;

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

    competition: async (root, args, ctx) => {
      const { id } = args;
      const { db } = ctx;

      try {
        const competition = await db.Competition.findById(id).exec();

        return competition;
      } catch (e) {
        return e;
      }
    }
  },

  Competition: {
    venue: async (root, args, ctx) => {
      const { venue: id } = root;
      const { loaders } = ctx;

      try {
        const venue = await loaders.venueLoader.load(id);

        return venue;
      } catch (e) {
        return e;
      }
    }
  }
};
