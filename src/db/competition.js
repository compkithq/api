const mongoose = require('./connection')
const { Schema } = mongoose

module.exports = mongoose.model(
  'Competition',
  Schema({
    finalsDate: 'Date',
    finalsLeaderboards: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'FinalsLeaderboard' }
    ],
    name: 'String',
    qualifiersEndDate: 'Date',
    qualifiersLeaderboards: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'QualifiersLeaderboard' }
    ],
    qualifiersStartDate: 'Date',
    registrationEndDate: 'Date',
    registrationStartDate: 'Date',
    slug: 'String',
    venue: mongoose.Schema.Types.ObjectId
  })
)
