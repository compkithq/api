const { Schema } = require('mongoose')
const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const { User } = require('./user')

const Athlete = User.discriminator(
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

const athleteLoader = () =>
  new DataLoader(async athleteIds => {
    const athletes = await Athlete.find({
      _id: { $in: athleteIds }
    }).exec()
    const athletesById = keyBy(athletes, '_id')

    return athleteIds.map(athleteId => athletesById[athleteId])
  })

module.exports = { Athlete, athleteLoader }
