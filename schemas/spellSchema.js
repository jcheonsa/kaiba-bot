const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqNum = {
    type: Number,
    default: 10
}

const spellSchema = mongoose.Schema({
    spellName: reqString,
    power: reqNum,
    cost: reqNum,
    description: reqString,
    abv: reqString,
})

module.exports = mongoose.model('spell-stats', spellSchema)