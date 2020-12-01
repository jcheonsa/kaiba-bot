const Discord = require("discord.js");

module.exports.suggest = async (message) => {
    try {
        let sEmbed = new Discord.MessageEmbed()

            .setColor("RANDOM")
            .setDescription("Got any ideas?")
            .addField(
                `Type in an idea.`,
                `Then enter ${prefix}cancel to stop.`
            )
            .setTitle("Suggestions", `\u200b`)
            .setFooter(`type ${prefix}cancel to abort this process at any time.`)
            .setTimestamp();
        let embedMSG = await message.author.send(sEmbed)
            .then((newmsg) => {
                newmsg.channel.awaitMessages(response => response.content, {
                    max: 1,
                    time: 30000,
                })
                    .then((collected) => {
                        let results = collected.entries();
                        message.guild.owner.send(results.next().value[1].content)

                    })
            });
    } catch {
        message.channel.send("Error in processing suggestions.")
    }
}