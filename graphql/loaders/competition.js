const DataLoader = require('dataloader')
const db = require('../db')
const keyBy = require('lodash.keyby')

module.exports = new DataLoader(async competitionIds => {
  const competitions = await db.Competition.find({
    _id: { $in: competitionIds }
  }).exec()
  const competitionsById = keyBy(competitions, '_id')

  return competitionIds.map(competitionId => competitionsById[competitionId])
})
