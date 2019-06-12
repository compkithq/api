module.exports = ({ scores, score, workoutType }) => {
  const scoreValues = scores
    .map(({ scaled, value }) => ({
      value,
      scaled
    }))
    .sort((a, b) => {
      if (a.scaled != b.scaled) return a.scaled ? 1 : -1

      if (workoutType === 'time') return a.value - b.value

      return b.value - a.value
    })

  const currentScoreIndex = scoreValues.map(score => score.value).indexOf(score)
  const previousScoreIndex = scoreValues[currentScoreIndex - 1]

  if (!previousScoreIndex) return currentScoreIndex + 1

  if (previousScoreIndex['value'] === currentScoreIndex['value'])
    return currentScoreIndex

  return currentScoreIndex + 1
}
