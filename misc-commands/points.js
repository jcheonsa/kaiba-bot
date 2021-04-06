const fPoints = require('../point-system/leaderboard');
const factionSchema = require('../schemas/factionSchema');
const config = require('../config.json')

module.exports = {

    commands: ['points', 'bal'],
    description: "Checks user's points.",
    expectedArgs: "<user>",
    maxArgs: 2,
    callback: async (message) => {
        let member = message.mentions.members.first() || message.member
        const target = member;
        const guildID = message.guild.id
        const userID = target.id

        const points = await fPoints.getPoints(guildID, userID)

        message.reply(`This user has ${points} points.`)

    },

}
