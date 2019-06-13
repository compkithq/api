const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const db = require('../../db')

module.exports = new DataLoader(async venueIds => {
  const venues = await db.Venue.find({ _id: { $in: venueIds } }).exec()
  const venuesById = keyBy(venues, '_id')

  return venueIds.map(venueId => venuesById[venueId])
})
