module.exports = ({ sort, dir, workoutType }) => {
  let scaledSort = {}
  let sortDir = dir === 'asc' ? 1 : -1

  if (sort === 'rank')
    scaledSort = {
      scaled: dir === 'asc' ? 1 : -1
    }
  if (['amrap', 'weight'].includes(workoutType))
    sortDir = dir === 'asc' ? -1 : 1

  const sortField = sort === 'rank' ? 'value' : sort

  return { ...scaledSort, [sortField]: sortDir }
}
