const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const jwt = require('jsonwebtoken')

const { JWT_PASSPHRASE } = process.env

exports.comparePassword = (current, target) => bcrypt.compare(current, target)

exports.isValidEmail = email => isEmail(email)

exports.signToken = user => jwt.sign(user, JWT_PASSPHRASE, { expiresIn: '1d' })
