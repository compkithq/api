const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Leaderboard',
  Schema(
    {
      athletes: [mongoose.Schema.Types.ObjectId],
      category: 'String',
      competition: { type: Schema.Types.ObjectId, ref: 'Competition' },
      division: 'String',
      gender: 'String',
      locked: 'Boolean',
      name: 'String',
      slug: 'String',
      tickets: [{ type: 'String' }],
      workouts: [mongoose.Schema.Types.ObjectId]
    },
    { discriminatorKey: 'type' }
  )
)
