const { calculateAthleteRank } = require('../../utils')
const { calculateScoreRank } = require('../../utils')

module.exports = {
  getQualifiersLeaderboardScoreboard: async (
    root,
    { leaderboardId },
    { db }
  ) => {
    try {
      const leaderboardAthletes = await db.Athlete.find({
        qualifiersLeaderboards: { $in: leaderboardId }
      }).exec()

      const leaderboardWorkouts = await db.Workout.find({
        leaderboard: { $eq: leaderboardId }
      }).exec()

      const buildAthletes = leaderboardAthletes.map(async athlete => {
        const { scores, ...rest } = athlete.toObject({ virtuals: true })

        const buildScores = leaderboardWorkouts.map(async workout => {
          const athleteScore = await db.Score.findOne({
            workout: { $eq: workout._id },
            athlete: { $eq: athlete._id }
          }).exec()
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

        const athleteScores = await Promise.all(buildScores)

        return {
          ...rest,
          scores: athleteScores,
          total: athleteScores.reduce((a, b) => a + b.rank, 0)
        }
      })

      const mappedAthletes = await Promise.all(buildAthletes)

      return {
        athletes: mappedAthletes
          .map(athlete => ({
            ...athlete,
            rank: calculateAthleteRank({
              athletes: mappedAthletes,
              total: athlete.total
            })
          }))
          .sort((a, b) => a.total - b.total),
        workouts: leaderboardWorkouts
      }
    } catch (e) {
      return e
    }
  }
}
