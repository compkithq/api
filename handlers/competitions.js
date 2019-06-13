const db = require('../db')

module.exports = async (req, res) => {
  try {
    res.send(await db.Competition.find().exec())
  } catch {
    res.status(500).json({
      status: '500',
      message: 'There was a problem processing your request'
    })
  }
}
