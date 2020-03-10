const { Schema } = require('mongoose')
const DataLoader = require('dataloader')
const keyBy = require('lodash.keyby')

const { User } = require('./user')

const Admin = User.discriminator(
  'Admin',
  Schema({}, { discriminatorKey: 'kind' })
)

const adminLoader = () =>
  new DataLoader(async adminIds => {
    const admins = await Admin.find({
      _id: { $in: adminIds }
    }).exec()
    const adminsById = keyBy(admins, '_id')

    return adminIds.map(adminId => adminsById[adminId])
  })

module.exports = { Admin, adminLoader }
