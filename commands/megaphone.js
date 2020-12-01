const { publicChannel, privChannel, ownerID } = require('../config.json')

module.exports.MP = async (message) => {
    try {
        if (message.author.id != ownerID || message.channel != privChannel) {
            return;
        }
        else {
            publicChannel.send(message.content.split("$s"))
        }
    } catch {
        privChannel.send("there was an error of sorts")
    }
}