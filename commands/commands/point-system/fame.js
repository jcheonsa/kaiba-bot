const fSchema = require('../../../schemas/factionSchema')

module.exports = {

    commands: ['fame'],
    description: "Fame somebody! Think Maplestory.",
    minArgs: 1,
    expectedArgs: `**<@user-to-fame>**`,
    callback: async (message) => {

        const target = message.mentions.users.first()

        if (!target) {
            message.reply(`You're faming nobody, you fool.`)
            return;
        }

        const { guild } = message
        const guildID = guild.id
        const targetID = target.id
        const authorID = message.author.id

        try {
            if (targetID === authorID) {
                message.reply('You cannot fame yourself..')
                return;
            }
            const now = new Date()
            const authorData = await fSchema.findOne({
                userID: authorID,
                guildID
            })

            if (authorData && authorData.lastFame) {
                const then = new Date(authorData.lastFame)

                const diff = now.getTime() - then.getTime()
                const diffHours = Math.round(diff / (1000 * 60))
                const remainHours = (24 * 60) - diffHours
                const remainMtoH = Math.floor(remainHours / 60)

                const hours = 24 * 60
                if (diffHours <= hours) {
                    message.reply(`Another **${remainMtoH}** hour(s) or **${remainHours}** minute(s) remain before you can fame again.`)
                    return
                }

            }
            // update "lastFame" property for the command sender
            await fSchema.findOneAndUpdate({
                // find a document that matches this criteria
                userID: authorID,
                guildID,
            }, {
                // insert this data if data is matched
                userID: authorID,
                guildID,
                lastFame: now
            }, {
                upsert: true,
                new: true
            })

            const result = await fSchema.findOneAndUpdate({
                userID: targetID,
                guildID,
            }, {
                userID: targetID,
                guildID,
                $inc: {
                    fame: 1
                }
            }, {
                upsert: true,
                new: true
            })

            const amount = result.fame
            message.reply(`You have famed <@${targetID}>! They now have ${amount} fame!`)

        } catch {
            console.log()
        }
    }
}