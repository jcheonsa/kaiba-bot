const Discord = require('discord.js')
const { prefix, lvlChannel, raRole, slRole, obRole } = require('../../../config.json')
const guildHandler = require('../../../profile-system/models/guild-handler')

module.exports = {

    commands: ['faction', 'guild'],
    description: "Choose your faction",

    callback: async (message) => {
        if (message.channel.id !== lvlChannel) {
            return message.reply(`Please chat in #server-rpg instead.`)
        }
        try {

            const member = message.member
            const guildID = message.guild.id;
            const userID = message.author.id;

            let fEmbed = new Discord.MessageEmbed()
                .setAuthor("The Millennium Sorting Hat")
                .setColor("RANDOM")
                .setThumbnail("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/627fe721-846f-4f75-ac61-111ca00b27dd/daqj0nl-c26a7f4f-d9fd-4e51-bca4-c1d80cfca8ef.png/v1/fill/w_792,h_757,strp/millennium_puzzle___render_by_alanmac95_daqj0nl-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03NTciLCJwYXRoIjoiXC9mXC82MjdmZTcyMS04NDZmLTRmNzUtYWM2MS0xMTFjYTAwYjI3ZGRcL2RhcWowbmwtYzI2YTdmNGYtZDlmZC00ZTUxLWJjYTQtYzFkODBjZmNhOGVmLnBuZyIsIndpZHRoIjoiPD03OTIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.I9Paq8o-_nto23NmaNjvHhMEQAyY43F3uBrXxdu9vr8")
                .setDescription("Subscribe yourself to the ranks of one of the Egyptian God Monsters")
                .addFields(
                    { name: 'Current Guild Masters', value: `Ra - The Winged Dragon of Rasé \n Obelisk - Seto Kaiba \n Slifer - Jisoo`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: `1) The Winged Dragon of Ra`, value: 'Justice, Unity, Wisdom, Honor.', inline: true },
                    { name: `2) Obelisk the Tormentor`, value: 'Valor, Ambition, Loyalty, Power.', inline: true },
                    { name: `3) Slifer the Sky Dragon`, value: 'Creativity, Bravery, Cunning, Faith.', inline: true },
                )
            let embedMSG = await message.channel.send(fEmbed);
            let filter = (m) => m.author.id === message.author.id;
            let query = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
            });

            let results = query.first().content;
            if (query.first().content === `${prefix}cancel`) {
                return message.reply("Utility aborted.");
            }

            if (results === "1") {
                if (member.roles.cache.has(slRole || obRole)) {
                    member.roles.remove(obRole)
                    member.roles.remove(slRole)
                }
                guildHandler.joinRa(message, guildID, userID)
                member.roles.add(raRole)
            }
            if (results === "2") {
                if (member.roles.cache.has(raRole || slRole)) {
                    member.roles.remove(raRole)
                    member.roles.remove(slRole)
                }
                guildHandler.joinObelisk(message, guildID, userID)
                member.roles.add(obRole)
            }
            if (results === "3") {
                if (member.roles.cache.has(raRole || obRole)) {
                    member.roles.remove(obRole)
                    member.roles.remove(raRole)
                }
                guildHandler.joinSlifer(message, guildID, userID)
                member.roles.add(slRole)
            }
        } finally {
            console.log("Someone joined a faction.")
        }
    }
}