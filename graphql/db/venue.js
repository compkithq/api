const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model(
  'Venue',
  Schema({
    address: 'String',
    latitude: 'String',
    longitude: 'String',
    name: 'String'
  })
)
