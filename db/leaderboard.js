const { model, Schema } = require('mongoose')

const Leaderboard = model(
  'Leaderboard',
  Schema(
    {
      athletes: [Schema.Types.ObjectId],
      category: 'String',
      competition: { type: Schema.Types.ObjectId, ref: 'Competition' },
      division: 'String',
      gender: 'String',
      locked: 'Boolean',
      name: 'String',
      slug: 'String',
      workouts: [Schema.Types.ObjectId]
    },
    { discriminatorKey: 'type' }
  )
)

module.exports = { Leaderboard }
