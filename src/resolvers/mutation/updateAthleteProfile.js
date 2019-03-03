module.exports = {
  updateAthleteProfile: async (root, { athleteId: id, profile }, { db }) => {
    try {
      return await db.Athlete.findByIdAndUpdate(id, profile, {
        new: true
      }).exec()
    } catch (e) {
      return e
    }
  }
}
