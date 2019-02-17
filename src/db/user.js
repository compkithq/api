const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'User',
  Schema(
    {
      email: 'String',
      name: 'String',
      password: 'String'
    },
    { discriminatorKey: 'kind' }
  )
)
