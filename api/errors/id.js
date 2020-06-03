const { createError } = require('apollo-errors')

exports.InvalidIDProvided = createError('InvalidIDProvided', {
  message: `Invalid ID provided. Please check and try again`
})
