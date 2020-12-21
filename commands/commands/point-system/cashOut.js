// manual voice-chat minutes to XP conversion
const fSchema = require('../../../schemas/factionSchema')
const levels = require('../../../point-system/levels')
const { prefix, lvlChannel } = require('../../../config.json')
const Discord = require('discord.js')

module.exports = {

    commands: ["cashout", "cash", "co"],
    description: "Check/cash out generated minutes to mesos! Doing this will reset your minutes!",
    cooldown: 10,
    callback: async (message) => {

        const member = message.member
        const { client, guild } = message
        const guildID = guild.id
        const userID = member.id

        if (message.channel.id !== lvlChannel) {
            return message.reply(`Please chat in #server-rpg instead.`)
        }

        const rpgChannel = client.channels.cache.get(lvlChannel)

        const pointsEmoji = message.guild.emojis.cache.find(
            (emoji) => emoji.name === "meso"
        );
        try {
            const userData = await fSchema.findOne({
                guildID,
                userID,
            })

            const neededXP = userData.level * userData.level * 100
            const udXP = Math.floor(userData.vcCD)
            // 30 minutes / 30 = 1 xp
            // every 30 minutes equals 100 XP
            const vcToxp = (Math.floor(udXP * 2.9))

            let cashEmbed = new Discord.MessageEmbed()

                .setColor("RANDOM")
                .setTitle(`Duelist Kingdom Voice chat generated minutes.`)
                .setDescription(`Level ${userData.level} ${userData.class} <@${userID}>`)
                .addField(`${userData.xp}/${neededXP} XP`, '\u200B')
                .addFields(
                    {
                        name: `Minutes in voice chat: `, value: `**${udXP}** \n `
                    },
                    {
                        name: `Conversion to xp: `, value: `**${vcToxp}** \n`
                    },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Press 1) to convert and cash out', value: 'Press any key to abort.' },
                )
                .setFooter('Duelist Kingdom')
            if (userData.faction === "Ra's Giga Chickens") {
                cashEmbed.setThumbnail('https://i.imgur.com/n65d1WV.png')
                    .setColor("#f2ed46")
            } else if (userData.faction === "Obelisk's Tormentors") {
                cashEmbed.setThumbnail('https://i.imgur.com/qPOvvXz.png')
                    .setColor("#2f5ced")
            } else if (userData.faction === "Slifer's Production Crew") {
                cashEmbed.setThumbnail('https://i.imgur.com/sJGSkhz.png')
                    .setColor("#e33b3b")
            }
            let leMSG = await rpgChannel.send(cashEmbed);
            let filter = (m) => m.author.id === message.author.id;
            let query = await rpgChannel.awaitMessages(filter, {
                max: 1,
                time: 30000
            });

            let results = query.first().content;
            if (results === `${prefix}cancel`) {
                return message.reply("I end my turn.");
            } else if (results === "1") {
                levels.cashOut(client, guildID, userID, vcToxp)
                return message.reply(`${pointsEmoji} Cashed out! ${pointsEmoji}`)
            }
            else {
                return message.reply("I end my turn.")
            }
        }
        catch (e) {
            message.reply("Cash out timed out.").then((message) =>
                message.delete({
                    timeout: 10000
                }))
            console.log("cash out was used")
        }
    }
}