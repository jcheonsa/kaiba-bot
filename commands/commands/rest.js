// users heal off the damage from combat
const userCombatSchema = require('../../schemas/classSchema')
const defaultCombatSchema = require('../../schemas/CRSchema')

module.exports = {

    commands: ['rest'],
    description: "rest up cus you're gettin messed up!",
    cooldown: 5,
    callback: async (message) => {

        const member = message.member
        const guildID = message.guild.id
        console.log(member)
        try {
            // get user class
            const userData = await userCombatSchema.findOne({
                guildID,
                userID: member.id
            })

            // get default class stats
            const defaultStats = await defaultCombatSchema.findOne({
                className: userData.class
            })

            let healed = defaultStats.hp - userData.hp
            let mpHealed = defaultStats.mp - userData.mp

            // return user (class) stats to their default values
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

            message.reply(`You rest by the bonfire.
            ✨**+${healed} HP** & **+ ${mpHealed} MP**✨`)

        } catch (e) {
            console.log(e)
        }
    }
}