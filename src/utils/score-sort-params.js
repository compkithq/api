module.exports = ({ sort, dir }) => {
  let scaledSort = {}

  if (sort === 'rank')
    scaledSort = {
      scaled: dir === 'asc' ? 1 : -1
    }

  const sortField = sort === 'rank' ? 'value' : sort

  return { ...scaledSort, [sortField]: dir === 'asc' ? 1 : -1 }
}
