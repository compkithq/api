const calculateScoreRank = require('../../utils/calculate-score-rank')

module.exports = {
  scoreboard: async (root, { leaderboardId }, { db }) => {
    try {
      const athletes = await db.Athlete.find({
        leaderboards: { $in: leaderboardId }
      }).exec()

      const workouts = await db.Workout.find({
        leaderboard: { $eq: leaderboardId }
      }).exec()

      const mappedAthletes = athletes.map(athlete => {
        const { scores, ...rest } = athlete.toObject({
          virtuals: true
        })

        return {
          ...rest,
          scores: async () => {
            const workoutIds = workouts.map(({ id }) => id)

            const athleteScores = await db.Score.find({
              _id: { $in: scores },
              workout: { $in: workoutIds }
            }).exec()

            return athleteScores.map(async score => {
              const allWorkoutScores = await db.Score.find({
                workout: { $in: score.workout }
              }).exec()

              const { type: workoutType } = await db.Workout.findById(
                score.workout
              ).exec()

              return {
                ...score.toObject({
                  virtuals: true
                }),
                rank: calculateScoreRank({
                  scores: allWorkoutScores,
                  score: score.value,
                  workoutType
                })
              }
            })
          }
        }
      })

      return {
        athletes: mappedAthletes,
        workouts
      }
    } catch (e) {
      return e
    }
  }
}
