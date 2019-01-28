const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Competition',
  Schema({
    finalsDate: 'Date',
    leaderboards: [mongoose.Schema.Types.ObjectId],
    name: 'String',
    qualifiersEndDate: 'Date',
    qualifiersStartDate: 'Date',
    registrationEndDate: 'Date',
    registrationStartDate: 'Date',
    slug: 'String',
    venue: mongoose.Schema.Types.ObjectId
  })
)
