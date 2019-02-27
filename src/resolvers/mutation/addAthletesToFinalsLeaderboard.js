module.exports = {
  addAthletesToFinalsLeaderboard: async (
    root,
    { leaderboardId, athletes: ids },
    { db, postmark }
  ) => {
    try {
      const leaderboard = await db.FinalsLeaderboard.findByIdAndUpdate(
        leaderboardId,
        {
          $push: { qualifiedAthletes: { $each: ids } }
        }
      )
        .populate('competition')
        .exec()

      const athletes = await db.Athlete.find({ _id: { $in: ids } })

      const {
        competition: { name: competitionName },
        name: leaderboardName
      } = leaderboard

      await postmark.sendEmailBatchWithTemplates(
        athletes.map(({ email, name }) => ({
          From: 'team@firstmeanseverything.com',
          TemplateId: '10470851',
          To: email,
          TemplateModel: {
            competitionName,
            leaderboardName,
            name
          }
        }))
      )

      return leaderboard
    } catch (e) {
      return e
    }
  }
}
