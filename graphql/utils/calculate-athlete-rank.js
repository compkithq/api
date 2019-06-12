module.exports = ({ athletes, total }) => {
  const totalValues = athletes.map(athlete => athlete.total).sort((a, b) => {
    return a - b
  })

  const currentTotalIndex = totalValues.indexOf(total) + 1

  const previousTotalIndex = totalValues[currentTotalIndex - 1]

  if (!previousTotalIndex) return currentTotalIndex + 1

  if (previousTotalIndex['total'] === currentTotalIndex['total'])
    return currentTotalIndex

  return currentTotalIndex + 1
}
