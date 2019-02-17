module.exports = {
  isAdmin: async ({ kind }, args, ctx) => {
    return kind === 'Admin' ? true : false
  }
}
