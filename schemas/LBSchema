const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const LBSchema = mongoose.Schema({
    _id: reqString,
    channelID: reqString
})

module.exports = mongoose.model('leaderboards', LBSchema)