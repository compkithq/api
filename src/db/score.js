const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Score',
  Schema({
    athlete: mongoose.Schema.Types.ObjectId,
    createdAt: 'Date',
    updatedAt: 'Date',
    value: 'Number',
    workout: mongoose.Schema.Types.ObjectId
  })
)
