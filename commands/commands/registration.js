const Discord = require('discord.js')
const fSchema = require('../../schemas/factionSchema')
const classSchema = require('../../schemas/classSchema')
const CRSchema = require('../../schemas/CRSchema')
const mongoose = require('../../mongoose')

module.exports = {

    commands: ['reg'],
    description: "Register for other RPG elements of Duelist Kingdom.",
    cooldown: 15,
    callback: async (message) => {

        try {
            const member = message.member
            const userID = message.author.id
            const guildID = message.guild.id

            const authorData = await fSchema.findOne({
                guildID,
                userID,
            })

            let { faction, name } = authorData

            const classData = await CRSchema.findOne({
                className: authorData.class
            })


            let { className, hp, mp, str, dex, int, luk, spell1, spell2, spell3, abv } = classData


            let embed = new Discord.MessageEmbed()
                .setTitle("Stats Check")
                .addFields(
                    { name: message.author.username, value: `HP: ${hp} \n MP:${mp}`, inline: true },
                    { name: "Class", value: `${className}`, inline: true },
                    { name: '\u200b', value: '\u200b' }
                )
                .addFields(
                    { name: "STATS", value: `${str} STR \n ${dex} DEX \n ${int} INT \n ${luk} LUK`, inline: true },
                    { name: "SPELLS", value: `\`\`null\`\``, inline: true },
                    { name: "SKILLS", value: `${spell1} \n ${spell2} \n ${spell3} \n **Curtain Call**`, inline: true }
                )
            message.channel.send(embed)
            message.reply("Registered for Duelist Kingdom demo")

            await classSchema.findOneAndUpdate({
                guildID,
                userID,
            },
                {
                    class: className,
                    username: member.nickname,
                    hp: hp,
                    mp: mp,
                    str: str,
                    dex: dex,
                    int: int,
                    luk: luk,
                    spell1: spell1,
                    spell2: spell2,
                    spell3: spell3,
                    abv: abv,
                },
                {
                    upsert: true,
                    new: true,
                }
            )

        } finally {
            mongoose.connection.close()
        }

    }

}