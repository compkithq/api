module.exports = {
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
}
