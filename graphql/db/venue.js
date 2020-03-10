const { model, Schema } = require('mongoose')
const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const Venue = model(
  'Venue',
  Schema({
    address: 'String',
    latitude: 'String',
    longitude: 'String',
    name: 'String'
  })
)

const venueLoader = () =>
  new DataLoader(async venueIds => {
    const venues = await Venue.find({ _id: { $in: venueIds } }).exec()
    const venuesById = keyBy(venues, '_id')

    return venueIds.map(venueId => venuesById[venueId])
  })

module.exports = {
  Venue,
  venueLoader
}
