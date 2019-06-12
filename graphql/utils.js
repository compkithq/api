const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const jwt = require('jsonwebtoken')

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

module.exports = {
  ...exports,
  verifyToken
}
