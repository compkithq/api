module.exports = {
  createWorkoutScore: async (
    root,
    { score: { athlete, value, workout } },
    { db }
  ) => {
    try {
      const score = await new db.Score({
        athlete,
        createdAt: new Date(),
        value,
        workout
      })

      await score.save()

      await db.Workout.findByIdAndUpdate(
        workout,
        { $push: { scores: score } },
        { new: true }
      )

      await db.Athlete.findByIdAndUpdate(
        athlete,
        { $push: { scores: score } },
        { new: true }
      )

      return score
    } catch (e) {
      return e
    }
  }
}
