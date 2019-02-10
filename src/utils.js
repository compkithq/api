const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const jwt = require('jsonwebtoken')

const { JWT_PASSPHRASE } = process.env

exports.comparePassword = (current, target) => bcrypt.compare(current, target)

exports.isValidEmail = email => isEmail(email)

exports.signToken = user => jwt.sign(user, JWT_PASSPHRASE, { expiresIn: '1d' })

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

module.exports = {
  ...exports,
  verifyToken
}
