const { AthleteWorkoutScoreExists } = require('../../errors/scores')

module.exports = {
  createWorkoutScore: async (
    root,
    { score: { athlete, value, workout } },
    { db }
  ) => {
    try {
      const existingScore = await db.Score.findOne({ athlete, workout })

      if (existingScore) throw new AthleteWorkoutScoreExists()

      const newScore = await new db.Score({
        athlete,
        createdAt: new Date(),
        value,
        workout
      })

      await newScore.save()

      await db.Workout.findByIdAndUpdate(
        workout,
        { $push: { scores: newScore } },
        { new: true }
      )

      await db.Athlete.findByIdAndUpdate(
        athlete,
        { $push: { scores: newScore } },
        { new: true }
      )

      return newScore
    } catch (e) {
      return e
    }
  }
}
