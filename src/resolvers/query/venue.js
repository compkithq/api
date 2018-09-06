module.exports = {
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
