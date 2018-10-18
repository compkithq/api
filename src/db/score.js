const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Score',
  Schema({
    scaled: 'Boolean',
    value: 'Number',
    workout: mongoose.Schema.Types.ObjectId
  })
)
