const { createError } = require('apollo-errors')

exports.AthleteWorkoutScoreExists = createError('AthleteWorkoutScoreExists', {
  message: `You've already submitted a score for this workout`
})
