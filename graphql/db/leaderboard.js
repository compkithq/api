const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model(
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
      tickets: [{ type: 'String' }],
      workouts: [Schema.Types.ObjectId]
    },
    { discriminatorKey: 'type' }
  )
)
