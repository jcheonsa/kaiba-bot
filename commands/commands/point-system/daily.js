const fSchema = require('../../../schemas/factionSchema'),
    levels = require('../../../point-system/levels')

const { lvlChannel, nitroRole } = require('../../../config.json')

module.exports = {

    commands: ['daily', 'dk'],
    description: "Get a random amount of points/xp every 24 hours!",
    callback: async (message) => {

        if (message.channel.id !== lvlChannel) {
            return message.reply(`Please chat in #server-rpg instead.`)
        }

        const member = message.member
        const { client, guild } = message
        const guildID = guild.id
        const userID = member.id

        const pointsEmoji = message.guild.emojis.cache.find(
            (emoji) => emoji.name === "meso"
        );
        
        try {
            function dXP(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            // set up 24 hour CD timer for daily
            const now = new Date()

            const authorData = await fSchema.findOne({
                guildID,
                userID: userID,
            })

            // different daily rewards for each guild
            if (authorData && authorData.faction) {
                if (authorData.faction === "Ra's Giga Chickens") {
                    var dailyXP = dXP(40, 80)
                    var dailyPoints = dXP(4, 7)

                } else
                    if (authorData.faction === "Obelisk's Tormentors") {
                        var dailyXP = dXP(1, 200)
                        var dailyPoints = dXP(1, 10)
                    }
                    else
                        if (authorData.faction === "Slifer's Production Crew") {
                            var dailyXP = dXP(30, 70)
                            var dailyPoints = dXP(2, 8)
                        } else {
                            var dailyXP = dXP(25, 100)
                            var dailyPoints = dXP(2, 8)
                        }
            }

            if (authorData && authorData.dailyCD) {
                const then = new Date(authorData.dailyCD)

                const diff = now.getTime() - then.getTime()
                const diffHours = Math.round(diff / (1000 * 60))
                const remainHours = (24 * 60) - diffHours
                const remainMtoH = Math.floor(remainHours / 60)

                const hours = 24 * 60
                if (diffHours <= hours) {
                    message.reply(`You've already claimed your daily rewards, there's still another **${remainMtoH}** hour(s) or **${remainHours}** minute(s) until your next claim.`)
                    return
                }

            }

            const pResult = await fSchema.findOneAndUpdate({
                guildID,
                userID: userID,
            },
                {
                    guildID,
                    userID,
                    dailyCD: now,
                    $inc: {
                        points: dailyPoints
                    }
                },
                {
                    upsert: true,
                    new: true
                })


            // send xp to levels mod
            levels.addXP(client, guildID, userID, dailyXP, message)

            const totalPoints = pResult.points
            message.reply(`**+ ${dailyPoints}** ${pointsEmoji} (total: ${totalPoints}) and **+ ${dailyXP}** experience.`)
            return
        } catch (e) {
            console.log(e)
        }
    }
}