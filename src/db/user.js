const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'User',
  Schema({
    email: {
      type: String
    },
    password: {
      type: String
    }
  })
)
