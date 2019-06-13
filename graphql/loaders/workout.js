const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const db = require('../../db')

module.exports = new DataLoader(async workoutIds => {
  const workouts = await db.Workout.find({ _id: { $in: workoutIds } }).exec()
  const workoutsById = keyBy(workouts, '_id')

  return workoutIds.map(workoutId => workoutsById[workoutId])
})
