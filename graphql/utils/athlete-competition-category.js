module.exports = ({ age }) => {
  switch (true) {
    case age < 35:
      return 'under-35'
    case age < 45:
      return '35-44'
    case age >= 45:
    default:
      return 'over-44'
  }
}
