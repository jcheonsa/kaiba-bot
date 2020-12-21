const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqNum = {
    type: Number,
    default: 0
}

const factionSchema = mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    username: reqString,
    class: {
        type: String,
        default: 'Citizen'
    },
    subclass: {
        type: String
    },
    faction: {
        type: String,
        default: 'Unaffiliated'
    },
    xp: reqNum,
    fame: reqNum,
    points: reqNum,
    level: {
        type: Number,
        default: 1,
    },
    lastFame: Date,
    xpCD: Date,
    dailyCD: Date,
    lastJoined: reqNum,
    vcCD: reqNum,

})

module.exports = mongoose.model('points', factionSchema)