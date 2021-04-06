const Discord = require('discord.js')
const mobSchema = require('../schemas/mobSchema')

module.exports = {

    commands: ['mob'],
    description: "get them mobbies in",
    cooldown: 10,
    permissions: ['ADMINISTRATOR'],

    callback: async (message) => {

        let mobName = "The Forbidden One"
        let type = "t0"
        let hp = 9999
        let mp = 9999
        let str = 9999
        let dex = 9999
        let int = 9999
        let luk = 9999
        let description = "A one-way trip on the Shadow Realm Express!"
        let img = "https://static.wikia.nocookie.net/yugioh/images/8/8f/ExodiatheForbiddenOne-LART-EN-UR-LE.png/revision/latest/scale-to-width-down/300?cb=20190701182802"

        const mobData = await mobSchema.findOneAndUpdate({
            mobName
        },
            {
                type: type,
                description: description,
                hp: hp,
                mp: mp,
                str: str,
                dex: dex,
                int: int,
                luk: luk,
                img: img
            },
            {
                upsert: true,
                new: true,
            }
        )

        message.reply(`You have registered ${mobName} into the mob database at tier ${type}.`)

    }
}