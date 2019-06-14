const db = require('@firstmeanseverything/db')

module.exports = async ({ query: { id } }, res) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      throw { status: '400', message: 'Not a valid ID' }

    const competition = await db.Competition.findById(id).exec()

    if (!competition)
      throw { status: '404', message: 'That resource could not be found' }

    res.send(competition)
  } catch ({ status, message }) {
    res.status(status).json({ status, message })
  }
}
