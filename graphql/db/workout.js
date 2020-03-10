const { model, Schema } = require('mongoose')
const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const Workout = model(
  'Workout',
  Schema({
    description: 'String',
    leaderboard: Schema.Types.ObjectId,
    standards: 'String',
    name: 'String',
    scores: [Schema.Types.ObjectId],
    type: 'String'
  })
)

const workoutLoader = () =>
  new DataLoader(async workoutIds => {
    const workouts = await Workout.find({ _id: { $in: workoutIds } }).exec()
    const workoutsById = keyBy(workouts, '_id')

    return workoutIds.map(workoutId => workoutsById[workoutId])
  })

module.exports = { Workout, workoutLoader }
