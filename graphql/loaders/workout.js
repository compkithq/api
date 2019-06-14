const DataLoader = require('dataloader')
const db = require('@firstmeanseverything/db')
const keyBy = require('lodash.keyby')

module.exports = new DataLoader(async workoutIds => {
  const workouts = await db.Workout.find({ _id: { $in: workoutIds } }).exec()
  const workoutsById = keyBy(workouts, '_id')

  return workoutIds.map(workoutId => workoutsById[workoutId])
})
