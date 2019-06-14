const DataLoader = require('dataloader')
const db = require('@firstmeanseverything/db')
const keyBy = require('lodash.keyby')

module.exports = new DataLoader(async scoreIds => {
  const scores = await db.Score.find({ _id: { $in: scoreIds } }).exec()
  const scoresById = keyBy(scores, '_id')

  return scoreIds.map(scoreId => scoresById[scoreId])
})
