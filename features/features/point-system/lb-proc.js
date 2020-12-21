// self-updating leaderboard
const lbSchema = require('../../../schemas/LBSchema')
const fSchema = require('../../../schemas/factionSchema')
const Discord = require('discord.js')
const config = require('../../../config.json')

const fetchTopMembers = async (guildID, client) => {

    const guild = client.guilds.cache.get(guildID)

    // points leaderboard


    let text = new Discord.MessageEmbed()
        .setAuthor("Faction Leaderboard")
        .setFooter("Updates every minute.")
        .setTimestamp()

    const result = await fSchema.aggregate(
        [
            {
                $match: {
                    guildID: config.guildID
                }
            },
            {
                $group: {
                    _id: "$faction",
                    points: { $sum: "$points" }
                }
            },
            {
                $sort: {
                    points: -1
                }
            },
            {
                $limit: 3
            }
        ]
    )


    for (let counter = 0; counter < result.length; ++counter) {
        const { _id, points } = result[counter]
        let name = `${_id}`

        text.addField(`${counter + 1}) ${points} points`, `${name}`)

    }

    if (text.fields[0].value === `Ra's Giga Chickens`) {

        text.setTitle("The world currently basks in the light of Ra.")
        text.setThumbnail('https://i.imgur.com/n65d1WV.png')
        text.setColor("#f2ed46")
        text.addFields(
            { name: '\u200B', value: '\u200B' },
            { name: '\u200B', value: '\u200B' },
            { name: '\u200B', value: 'Raw' },
        )
        text.setImage('https://i.imgur.com/goLUOab.png')

        return text
    };

    if (text.fields[0].value === `Obelisk's Tormentors`) {

        text.setTitle("Tremble in the might of Obelisk and his Tormentors.")
        text.setThumbnail('https://i.imgur.com/qPOvvXz.png')
        text.setColor("#2f5ced")
        text.addFields(
            { name: '\u200B', value: '\u200B' },
            { name: '\u200B', value: '\u200B' },
            { name: '\u200B', value: 'Nice' },
        )
        text.setImage('https://i.imgur.com/cOqLlXQ.png')

        return text
    };

    if (text.fields[0].value === `Slifer's Production Crew`) {

        text.setTitle("So let it be known that Slifer is the greatest of the Egyptian God Monsters.")
        text.setThumbnail('https://i.imgur.com/sJGSkhz.png')
        text.setColor("#e33b3b")
        text.addFields(
            { name: '\u200B', value: '\u200B' },
            { name: '\u200B', value: '\u200B' },
            { name: '\u200B', value: 'Oh no' },
        )
        text.setImage('https://i.imgur.com/pvKfdX9.png')

        return text
    };

}

const updateLB = async (client) => {
    const results = await lbSchema.find({})

    for (const result of results) {
        const { channelID, _id: guildID } = result

        const guild = client.guilds.cache.get(guildID)
        if (guild) {
            const channel = guild.channels.cache.get(channelID)
            if (channel) {
                const messages = await channel.messages.fetch()
                const firstMessage = messages.first()

                const topMembers = await fetchTopMembers(guildID, client)

                if (firstMessage) {
                    firstMessage.edit(topMembers)
                } else {
                    channel.send(topMembers)
                }
            }
        }
    }

    setTimeout(() => {
        updateLB(client)
    }, 1000 * 60)
}

module.exports = async (client) => {
    updateLB(client)
}