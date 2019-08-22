const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

const { JWT_PASSPHRASE } = process.env

exports.comparePassword = async (current, target) =>
  await bcrypt.compare(current, target)

exports.isValidEmail = email => isEmail(email)

exports.signToken = async user =>
  await jwt.sign(user, JWT_PASSPHRASE, { expiresIn: '1d' })

verifyToken = async token => await jwt.verify(token, JWT_PASSPHRASE)

exports.getUserId = async ({ req }) => {
  try {
    if (req.headers.authorization) {
      const { id } = await verifyToken(req.headers.authorization)

      return id
    }

    return null
  } catch (e) {
    return e
  }
}

exports.hashPassword = async password => {
  const salt = await bcrypt.genSalt(5)

  return bcrypt.hash(password, salt, null)
}

exports.withCors = handler => (req, res, ...args) => {
  if (req.method === 'OPTIONS') return res.end()

  return handler(req, res, ...args)
}

exports.athleteCompetitionAge = ({ finalsDate, dateOfBirth }) => {
  return dayjs(finalsDate).diff(dateOfBirth, 'year')
}

exports.athleteCompetitionCategory = ({ age }) => {
  switch (true) {
    case age < 35:
      return 'under-35'
    case age < 45:
      return '35-44'
    case age >= 45:
    default:
      return 'over-44'
  }
}

exports.calculateAthleteRank = ({ athletes, total }) => {
  const totalValues = athletes
    .map(athlete => athlete.total)
    .sort((a, b) => {
      return a - b
    })

  const currentTotalIndex = totalValues.indexOf(total) + 1

  const previousTotalIndex = totalValues[currentTotalIndex - 1]

  if (!previousTotalIndex) return currentTotalIndex + 1

  if (previousTotalIndex['total'] === currentTotalIndex['total'])
    return currentTotalIndex

  return currentTotalIndex + 1
}

exports.calculateScoreRank = ({ scores, score, workoutType }) => {
  const scoreValues = scores
    .map(({ scaled, value }) => ({
      value,
      scaled
    }))
    .sort((a, b) => {
      if (a.scaled != b.scaled) return a.scaled ? 1 : -1

      if (workoutType === 'time') return a.value - b.value

      return b.value - a.value
    })

  const currentScoreIndex = scoreValues.map(score => score.value).indexOf(score)
  const previousScoreIndex = scoreValues[currentScoreIndex - 1]

  if (!previousScoreIndex) return currentScoreIndex + 1

  if (previousScoreIndex['value'] === currentScoreIndex['value'])
    return currentScoreIndex

  return currentScoreIndex + 1
}

exports.scoreSortParams = ({ sort, dir, workoutType }) => {
  let scaledSort = {}
  let sortDir = dir === 'asc' ? 1 : -1

  if (sort === 'rank')
    scaledSort = {
      scaled: dir === 'asc' ? 1 : -1
    }
  if (['amrap', 'weight'].includes(workoutType))
    sortDir = dir === 'asc' ? -1 : 1

  const sortField = sort === 'rank' ? 'value' : sort

  return { ...scaledSort, [sortField]: sortDir }
}

module.exports = {
  ...exports,
  verifyToken
}
