const LBSchema = require('../schemas/LBSchema')
const mongo = require('../mongoose')

module.exports.setLB = async (message) => {
    return await mongo().then(async (mongoose) => {
        const { guild, channel } = message
        const guildID = guild.id
        const channelID = channel.id

        await LBSchema.findOneAndUpdate({
            _id: guildID,
            channelID
        }, {
            _id: guildID,
            channelID
        }, {
            upsert: true
        })
        message.reply('Module set up.')
            .then((message) => {
                message.delete({
                    timeout: 1000 * 5
                })
            })
        message.delete()
    })

}