// allow admins to reward points to users
const leaderboard = require('../../../point-system/leaderboard')

module.exports = {

  commands: ['nice'],
  description: "Rewards points to user.",
  expectedArgs: `<@user> <points>`,
  permissions: ['ADMINISTRATOR'],
  callback: async (message) => {
    let member = message.mentions.members.first()

    const args = message.content.slice(prefix.length).split(/ +/g);
    const target = member;

    if (!target) {
      message.reply('Make sure to tag someone to give points to.')
      return
    }

    const points = args[2]
    if (isNaN(points)) {
      message.reply(`Make sure points are an integer.`)
      return
    }

    const guildID = message.guild.id
    const userID = target.id

    const newPoints = await leaderboard.addPoints(guildID, userID, points)

    message.reply(`Gave <@${userID}> ${points} point(s). They now have ${newPoints} point(s)!`)
  },
}

