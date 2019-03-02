const { createError } = require('apollo-errors')

exports.IncorrectCredentialsError = createError('IncorrectAuthCredentials', {
  message: 'Incorrect email/password combination'
})

exports.InvalidEmailError = createError('InvalidEmailError', {
  message: 'Invalid email provided'
})

exports.InvalidResetError = createError('InvalidResetError', {
  message: 'Password reset token is invalid or has expired'
})
