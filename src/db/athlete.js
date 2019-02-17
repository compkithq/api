const mongoose = require('./connection')
const { Schema } = mongoose

const User = require('./user')

module.exports = User.discriminator(
  'Athlete',
  Schema(
    {
      box: 'String',
      dateOfBirth: 'Date',
      gender: {
        enum: ['female', 'male'],
        type: String
      },
      leaderboards: [mongoose.Schema.Types.ObjectId],
      scores: [mongoose.Schema.Types.ObjectId],
      stripeID: 'String'
    },
    { discriminatorKey: 'kind' }
  )
)
