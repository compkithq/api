const mongoose = require('mongoose')

const { MONGO_URL } = process.env

mongoose.connect(`mongodb://${MONGO_URL}`, { useNewUrlParser: true })

module.exports = mongoose
