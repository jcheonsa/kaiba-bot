// log users into mongo when they join a faction
const Discord = require("discord.js")
const { prefix } = require('../../config.json')
const factionSchema = require("../../schemas/factionSchema")

module.exports = {

    async joinRa(message, guildID, userID) {

        let raEmbed = new Discord.MessageEmbed()
            .setThumbnail('https://i.imgur.com/zunsF18.png')
            .setColor("#f2ed46")
            .setImage('https://i.imgur.com/goLUOab.png')
            .addFields(
                {
                    name: "Guild Master", value: "The Winged Dragon of Rasé"
                },
                {
                    name: "Members", value: "The Giga Chicks"
                },
                {
                    name: "I can't think of any flavor text for now, but I plan to add a bunch", value: " - Kaiba"
                }
            )
        message.channel.send(raEmbed)
        await factionSchema.updateOne({
            guildID,
            userID,
        },
            {
                guildID,
                userID,
                faction: "Ra's Giga Chickens"
            });

        return message.channel.send("You are now part of Ra's Giga Chickens!")

    },
    async joinObelisk(message, guildID, userID) {

        let obEmbed = new Discord.MessageEmbed()
            .setThumbnail('https://imgur.com/nDvZQ9E.pngs')
            .setColor("#2f5ced")
            .setImage('https://i.imgur.com/cOqLlXQ.png')
            .setDescription(`**Valor, Ambition, Loyalty, Power.** \n
                        Their numbers are few, but with good reason. If you can talk the talk **and** walk the walk, then you will probably find yourself among the ranks of the Tormentors. \n
                        Old tales and stories have been told of this mighty but solitary force; that all that stand between them and their goal are eviscerated life points. \n
                        Only the strongest are adorn with the cerulean blue; the most feared of whom, **Seto Kaiba** is not only the ambition, but the skillset to achieve the impossible. \n
                        With the absence of **YUGI MOTO** in this realm, it may be best to join Obelisk or flee, because the blue coats are indeed coming.`)
            .addFields(
                {
                    name: "Guild Master", value: "Seto Kaiba"
                },
                {
                    name: "Members", value: "The Tormentors"
                },

            )
        message.channel.send(obEmbed)
        await factionSchema.updateOne({
            guildID,
            userID,
        },
            {
                guildID,
                userID,
                faction: "Obelisk's Tormentors"
            });

        return message.channel.send("You are now among Obelisks's ranks!")
    },
    async joinSlifer(message, guildID, userID) {

        let sfEmbed = new Discord.MessageEmbed()
            .setThumbnail('https://imgur.com/ujInR8I.pngs')
            .setColor("#e33b3b")
            .setImage('https://i.imgur.com/pvKfdX9.png')
            .setDescription(`**Creativity, Bravery, Cunning, Faith.** \n
                            Everything from rewards to power scales with the number of members in Slifer's Production Crew. As long
                            as the crew remain strong through thick and thin, there is not an obstacle they cannot handle together.\n
                            Taking part in Slifer's ritual, and although what exactly happens during this process is unknown to outsiders, 
                            it has been said that this ritual links each member's very soul to one another - indicated by The Production Crew's trademark crimson tinge in their eyes. \n
                            Under the leadership of **Jisoo**, The Production Crew seeks points/fame stretching toward the heavens, 
                            in hopes of one day even reaching Slifer himself.`)
            .addFields(
                {
                    name: "Guild Master", value: "Jisoo"
                },
                {
                    name: "Members", value: "The Production Crew"
                },
            )
        message.channel.send(sfEmbed)
        await factionSchema.updateOne({
            guildID,
            userID,
        },
            {
                guildID,
                userID,
                faction: "Slifer's Production Crew"
            });

        return message.channel.send("Welcome to Slifer's executive production crew!")
    }
}