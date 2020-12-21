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

const jobSchema = mongoose.Schema({
    className: {
        type: String,
        default: 'Citizen'
    },
    faction: {
        type: String,
        default: 'Unaffiliated'
    },
    hp: reqStats,
    mp: reqStats,
    str: reqStats,
    dex: reqStats,
    int: reqStats,
    luk: reqStats,
    spell1: reqString,
    spell2: reqString,
    spell3: reqString,
    abv: reqString,

})

module.exports = mongoose.model('class-stats', jobSchema)