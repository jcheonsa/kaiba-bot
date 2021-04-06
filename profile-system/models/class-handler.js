const fSchema = require('../../schemas/factionSchema')

// handles all changes to user class
module.exports = {

    async setClass(lvlChannel, job, guildID, userID) {
        try {

            const userData = await fSchema.updateOne({
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