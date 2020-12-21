const spellSchema = require('../../schemas/spellSchema')

module.exports = {

    commands: ['spell'],
    description: 'get them spells in',
    cooldown: 10,
    permissions: ['ADMINISTRATOR'],

    callback: async (message) => {

        let spellName = "Improvisation"
        let power = 100
        let cost = 5
        let description = "Your training and understanding of a plethora of weapons allows you to adapt quickly. Raise your avoidability."

        await spellSchema.findOneAndUpdate({
            spellName
        },
            {
                power: power,
                cost: cost,
                description: description
            },
            {
                upsert: true,
                new: true,
            }
        )

        message.reply(`You have registered **${spellName}** into the spell db.`)

    }

}