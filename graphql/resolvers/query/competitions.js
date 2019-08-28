const { InvalidIDProvided } = require('../../errors/id')

module.exports = {
  competitions: async (root, { limit, offset }, { db }) => {
    try {
      const competitions = await db.Competition.find()
        .limit(limit)
        .skip(offset)
        .exec()

      return competitions
    } catch (e) {
      return e
    }
  },

  competition: async (root, { where }, { db }) => {
    try {
      const query = Object.entries(where).reduce((accumulator, [key, val]) => {
        const validateID = val => {
          if (!val.match(/^[0-9a-fA-F]{24}$/)) throw new InvalidIDProvided()

          return val
        }

        return {
          ...accumulator,
          [key === 'id' ? `_id` : key]: key === 'id' ? validateID(val) : val
        }
      }, {})

      const competition = await db.Competition.findOne(query).exec()

      return competition
    } catch (e) {
      return e
    }
  }
}
