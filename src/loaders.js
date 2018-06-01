const DataLoader = require('dataloader');
const keyBy = require('lodash.keyby');

const db = require('./db');

exports.venueLoader = new DataLoader(async venueIds => {
  const venues = await db.Venue.find({ _id: { $in: venueIds } }).exec();
  const venuesById = keyBy(venues, '_id');

  return venueIds.map(venueId => venuesById[venueId]);
});

exports.competitionLoader = new DataLoader(async competitionIds => {
  const competitions = await db.Competition.find({
    _id: { $in: competitionIds }
  }).exec();
  const competitionsById = keyBy(competitions, '_id');

  return competitionIds.map(competitionId => competitionsById[competitionId]);
});
