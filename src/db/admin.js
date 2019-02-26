const mongoose = require('./connection')
const { Schema } = mongoose

const User = require('./user')

module.exports = User.discriminator(
  'Admin',
  Schema({}, { discriminatorKey: 'kind' })
)
