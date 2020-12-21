const config = require('./config.json')
const ownerID = config.ownerID

module.exports.MP = (message) => {
    // try {

    const { client } = message

    const publicChannel = client.channels.cache.get(config.publicChannel)
    const privChannel = client.channels.cache.get(config.privChannel)
    const lvlChannel = client.channels.cache.get(config.lvlChannel)

    console.log(message.author.id)
    if (!message.author.id === ownerID || !message.channel === privChannel) {
        console.log("Hello")
        return;
    }
    else {
        lvlChannel.send(message.content.split("$space"))
    }
    // } catch {
    //     privChannel.send("there was an error of sorts")
    // }
}