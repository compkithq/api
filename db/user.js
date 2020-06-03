const { model, Schema } = require('mongoose')

const User = model(
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

module.exports = { User }
