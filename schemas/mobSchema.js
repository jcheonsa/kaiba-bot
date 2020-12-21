const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqNum = {
    type: Number,
    default: 0
}

const reqStats = {
    type: Number,
    default: 10
}

const mobSchema = mongoose.Schema({
    mobName: {
        type: String,
        default: 'Monster'
    },
    type: {
        type: String,
        default: 'mob'
    },
    faction: {
        type: String,
        default: 'Unaffiliated'
    },
    description: {
        type: String,
        default: 'Monster description'
    },
    hp: reqStats,
    mp: reqStats,
    str: reqStats,
    dex: reqStats,
    int: reqStats,
    luk: reqStats,
    img: reqString

})

module.exports = mongoose.model('mob-stats', mobSchema)