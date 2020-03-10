const { model, Schema } = require('mongoose')
const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const Competition = model(
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
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' }
  })
)

const competitionLoader = () =>
  new DataLoader(async competitionIds => {
    const competitions = await Competition.find({
      _id: { $in: competitionIds }
    }).exec()
    const competitionsById = keyBy(competitions, '_id')

    return competitionIds.map(competitionId => competitionsById[competitionId])
  })

module.exports = {
  Competition,
  competitionLoader
}
