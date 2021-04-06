const Discord = require('discord.js')

const userCombatSchema = require('../../schemas/classSchema')
const defaultCombatSchema = require('../../schemas/CRSchema')

module.exports = {

    commands: ['rest'],
    description: "rest up cus you're gettin fked up",
    cooldown: 5,
    callback: async (message) => {

        const member = message.member
        const guildID = message.guild.id
        console.log(member)

        const userData = await userCombatSchema.findOne({
            guildID,
            userID: member.id
        })

        const defaultStats = await defaultCombatSchema.findOne({
            className: userData.class
        })

        let healed = defaultStats.hp - userData.hp
        let mpHealed = defaultStats.mp - userData.mp

        await userCombatSchema.findOneAndUpdate({
            guildID: guildID,
            userID: member.id,
        },
            {
                hp: defaultStats.hp,
                mp: defaultStats.mp
            },
            {
                upsert: true,
                new: true,
            })

        if (member.id === `113509252496146432`) {
            return message.reply(`You get some of that mango habanero (fkin degen).
                ✨**+${healed} HP** & **+ ${mpHealed} MP**✨`)
        }

        message.reply(`You rest by the bonfire.
            ✨**+${healed} HP** & **+ ${mpHealed} MP**✨`)

    }
}