const mongoose = require('./connection')
const { Schema } = mongoose

const User = require('./user')

module.exports = User.discriminator(
  'Athlete',
  Schema(
    {
      box: 'String',
      dateOfBirth: 'Date',
      finalsLeaderboards: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'FinalsLeaderboard' }
      ],
      gender: {
        enum: ['female', 'male'],
        type: String
      },
      qualifiersLeaderboards: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'QualifiersLeaderboard' }
      ],
      scores: [mongoose.Schema.Types.ObjectId],
      stripeID: 'String'
    },
    { discriminatorKey: 'kind' }
  )
)
