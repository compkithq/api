const dayjs = require('dayjs')

module.exports = ({ finalsDate, dateOfBirth }) => {
  return dayjs(finalsDate).diff(dateOfBirth, 'year')
}
