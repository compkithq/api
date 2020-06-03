const { model, Schema } = require('mongoose')
const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const Score = model(
  'Score',
  Schema({
    athlete: Schema.Types.ObjectId,
    createdAt: 'Date',
    updatedAt: 'Date',
    value: 'Number',
    workout: Schema.Types.ObjectId
  })
)

const scoreLoader = () =>
  new DataLoader(async (scoreIds) => {
    const scores = await Score.find({ _id: { $in: scoreIds } }).exec()
    const scoresById = keyBy(scores, '_id')

    return scoreIds.map((scoreId) => scoresById[scoreId])
  })

module.exports = { Score, scoreLoader }
