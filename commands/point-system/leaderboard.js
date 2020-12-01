const mongo = require('../../mongoose')
const factionSchema = require('../../schemas/factionSchema')

const pointsCache = {}

module.exports.addPoints = async (guildID, userID, points) => {
    return await mongo().then(async (mongoose) => {
        try {

            const result = await factionSchema.findOneAndUpdate({
                guildID,
                userID
            }, {
                guildID,
                userID,
                $inc: {
                    points
                }
            }, {
                upsert: true,
                new: true
            })

            return result.points

        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getPoints = async (guildID, userID) => {

    const cachedValue = pointsCache[`${guildID}-${userID}`]
    if (cachedValue) {
        return cachedValue
    }

    return await mongo().then(async (mongoose) => {
        try {

            const result = await factionSchema.findOne({
                guildID,
                userID
            })

            console.log('RESULT: ', result)

            let points = 0
            if (result) {
                points = result.points
            } else {

                await new factionSchema({
                    guildID,
                    userID,
                    points
                }).save()
            }

            pointsCache[`${guildID}-${userID}`] = points

            return points

        } finally {
            mongoose.connection.close()
        }
    })
}