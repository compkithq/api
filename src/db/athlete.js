const mongoose = require('./connection')
const { Schema } = mongoose

const User = require('./user')

module.exports = User.discriminator(
  'Athlete',
  Schema(
    {
      box: 'String',
      name: 'String',
      scores: [mongoose.Schema.Types.ObjectId]
    },
    { discriminatorKey: 'kind' }
  )
)
