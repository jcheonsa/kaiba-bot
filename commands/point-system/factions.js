const faction = require('./leaderboard')

module.exports = {

    async balance(message, member) {
        const target = member;
        const targetID = target.id
        
        const guildID = message.guild.id
        const userID = target.id

        const points = await faction.getPoints(guildID, userID)

        message.reply(`This user has ${points} points.`)


    },

}

