const mongoose = require('mongoose')

const { MONGO_URL } = process.env

mongoose.connect(`mongodb://${MONGO_URL}`)

const connection = mongoose.connection

module.exports = mongoose
