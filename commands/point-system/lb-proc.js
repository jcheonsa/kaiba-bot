const LBSchema = require('../../schemas/LBSchema')
const FSchema = require('../../schemas/factionSchema')

module.exports = {
    async uLB() {
        const fetchTopMembers = async (guildID) => {
            let text = ''

            const results = await FSchema.find({
                guildID
            })

            console.log('RESULTS: ', results)

            return text
        }

        const updateLB = async (bot) => {
            const results = await LBSchema.find({})

            for (const result of results) {
                const { channelID, _id: guildID } = result

                const guild = bot.guilds.cache.get(guildID)

                if (guild) {
                    const channel = guild.channels.cache.get(channelID)
                    if (channel) {
                        const messages = await channel.messages.fetch()
                        const firstM = messages.first()

                        const topMembers = await fetchTopMembers(guildID)
                    }
                }

            }
            setTimeout(() => {
                updateLB(bot)
            }, 1000 * 60)
        }
    }
}

module.exports = async (bot) => {
    updateLB(bot)
}