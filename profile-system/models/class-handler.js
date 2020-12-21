const fSchema = require('../../schemas/factionSchema')

module.exports = {

    async setClass(lvlChannel, job, guildID, userID) {
        try {

            await fSchema.updateOne({
                guildID,
                userID,
            }, {
                guildID,
                userID,
                class: job
            }, {
                upsert: true,
                new: true
            })

            return lvlChannel.send(`You have attained greater power.`)

        } catch {
            console.log("Hello")
        }
    }
}