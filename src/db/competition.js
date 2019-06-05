const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model(
  'Competition',
  Schema({
    finalsDate: 'Date',
    finalsLeaderboards: [
      { type: Schema.Types.ObjectId, ref: 'FinalsLeaderboard' }
    ],
    name: 'String',
    qualifiersEndDate: 'Date',
    qualifiersLeaderboards: [
      { type: Schema.Types.ObjectId, ref: 'QualifiersLeaderboard' }
    ],
    qualifiersStartDate: 'Date',
    registrationEndDate: 'Date',
    registrationStartDate: 'Date',
    slug: 'String',
    tickets: [{ type: 'String' }],
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' }
  })
)
