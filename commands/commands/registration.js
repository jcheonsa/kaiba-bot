const Discord = require('discord.js')
const fSchema = require('../../schemas/factionSchema')
const classSchema = require('../../schemas/classSchema')
const CRSchema = require('../../schemas/CRSchema')

module.exports = {

    commands: ['reg'],
    description: "Register for other RPG elements of Duelist Kingdom.",
    cooldown: 15,
    callback: async (message) => {

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

        // get default class data from corresponding schema
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

        // attach stats to the user and not just class
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


    }

}

async function registerStats(className, hp, mp, str, dex, int, luk) {

    try {
        const statsData = await CRSchema.findOneAndUpdate({
            className,
        },
            {
                className,
                hp,
                mp,
                str,
                dex,
                int,
                luk,
            },
            {
                upsert: true,
                new: true
            })
    } catch (e) {
        console.log(e)
    }
}