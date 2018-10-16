module.exports = ({ scores, score, type }) => {
  const scoreValues = scores
    .map(({ scaled, value }) => ({
      value,
      scaled
    }))
    .sort((a, b) => {
      if (a.scaled != b.scaled) return a.scaled ? 1 : -1

      if (type === 'time') return a.value - b.value

      return b.value - a.value
    })

  const currentScore = scoreValues.map(score => score.value).indexOf(score)
  const previousScore = scoreValues[currentScore - 1]

  if (!previousScore) return currentScore + 1

  if (previousScore['value'] === currentScore['value']) return currentScore

  return currentScore + 1
}
