const DataLoader = require('dataloader')
const db = require('./db')
const keyBy = require('lodash.keyby')

module.exports = new DataLoader(async athleteIds => {
  const athletes = await db.Athlete.find({
    _id: { $in: athleteIds }
  }).exec()
  const athletesById = keyBy(athletes, '_id')

  return athleteIds.map(athleteId => athletesById[athleteId])
})
