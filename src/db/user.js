const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'User',
  Schema(
    {
      email: {
        lowercase: true,
        required: 'Email address cannot be blank',
        trim: true,
        type: String
      },
      name: {
        required: 'Name cannot be blank',
        trim: true,
        type: String
      },
      resetPasswordExpires: 'Date',
      resetPasswordToken: 'String',
      password: {
        required: 'Password cannot be blank',
        type: String
      }
    },
    { discriminatorKey: 'kind' }
  )
)
