const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model(
  'Score',
  Schema({
    athlete: Schema.Types.ObjectId,
    createdAt: 'Date',
    updatedAt: 'Date',
    value: 'Number',
    workout: Schema.Types.ObjectId
  })
)
