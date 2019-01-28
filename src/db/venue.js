const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Venue',
  Schema({
    address: 'String',
    latitude: 'String',
    longitude: 'String',
    name: 'String'
  })
)
