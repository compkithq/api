const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const db = require('../db')

module.exports = new DataLoader(async athleteIds => {
  const athletes = await db.Athlete.find({
    _id: { $in: athleteIds }
  }).exec()
  const athletesById = keyBy(athletes, '_id')

  return athleteIds.map(athleteId => athletesById[athleteId])
})
