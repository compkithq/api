module.exports = {
  scores: async ({ scores: ids }, args, { loaders: { scoreLoader } }) => {
    try {
      const scores = await scoreLoader.loadMany(ids)

      return scores
    } catch (e) {
      return e
    }
  }
}
