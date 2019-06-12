const mongoose = require('mongoose')
const { Schema } = mongoose

const User = require('./user')

module.exports = User.discriminator(
  'Athlete',
  Schema(
    {
      box: {
        required: 'Box name cannot be blank',
        trim: true,
        type: String
      },
      dateOfBirth: {
        required: 'Date of birth cannot be blank',
        type: Date
      },
      finalsLeaderboards: [
        { type: Schema.Types.ObjectId, ref: 'FinalsLeaderboard' }
      ],
      gender: {
        enum: ['female', 'male'],
        required: 'Gender cannot be blank',
        type: String
      },
      qualifiersLeaderboards: [
        { type: Schema.Types.ObjectId, ref: 'QualifiersLeaderboard' }
      ],
      scores: [Schema.Types.ObjectId],
      size: {
        enum: ['xs', 'small', 'medium', 'large', 'xl', 'xxl'],
        type: String
      },
      stripeID: 'String'
    },
    { discriminatorKey: 'kind' }
  )
)
