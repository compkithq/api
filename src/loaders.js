const DataLoader = require('dataloader');
const keyBy = require('lodash.keyby');

const db = require('./db');

exports.venueLoader = new DataLoader(venueIds => {
  return db.Venue.find({ _id: { $in: venueIds } }).then(venues => {
    const venuesById = keyBy(venues, '_id');

    return venueIds.map(venueId => venuesById[venueId]);
  });
});
