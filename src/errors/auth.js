const { createError } = require('apollo-errors')

exports.IncorrectCredentialsError = createError('IncorrectAuthCredentials', {
  message: 'Incorrect credentials. Please check and try again'
})

exports.InvalidResetError = createError('InvalidResetError', {
  message: 'Password reset token is invalid or has expired'
})
