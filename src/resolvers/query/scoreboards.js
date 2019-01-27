const calculateScoreRank = require('../../utils/calculate-score-rank')

module.exports = {
  scoreboard: async (root, { leaderboardId }, { db }) => {
    try {
      const leaderboardAthletes = await db.Athlete.find({
        leaderboards: { $in: leaderboardId }
      }).exec()

      const leaderboardWorkouts = await db.Workout.find({
        leaderboard: { $eq: leaderboardId }
      }).exec()

      const mappedAthletes = leaderboardAthletes.map(athlete => {
        const { scores, ...rest } = athlete.toObject({ virtuals: true })

        return {
          ...rest,
          scores: async () => {
            return leaderboardWorkouts.map(async workout => {
              const athleteScore = await db.Score.findOne({
                workout: { $eq: workout._id },
                athlete: { $eq: athlete._id }
              })

              const allWorkoutScores = await db.Score.find({
                workout: { $in: workout._id }
              }).exec()

              if (athleteScore) {
                return {
                  ...athleteScore.toObject({
                    virtuals: true
                  }),
                  rank: calculateScoreRank({
                    scores: allWorkoutScores,
                    score: athleteScore.value,
                    workoutType: workout.type
                  })
                }
              }

              const newScore = new db.Score({
                value: 0,
                workout: workout._id
              })

              return {
                ...newScore.toObject({
                  virtuals: true
                }),
                rank: allWorkoutScores.length + 1
              }
            })
          }
        }
      })

      return { athletes: mappedAthletes, workouts: leaderboardWorkouts }
    } catch (e) {
      return e
    }
  }
}
