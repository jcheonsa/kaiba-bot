const Discord = require("discord.js");
const { prefix, build } = require('../config.json')

module.exports.help = async (message, guild) => {
    try {
        const helpEmbed = new Discord.MessageEmbed() // bot info script
            .setAuthor(
                "Seto Kaiba",
                "https://pbs.twimg.com/profile_images/1161902985808633856/V3_zMF1x.jpg"
            )
            .setColor("#A652BB")
            .setTitle("Server Information")
            .setThumbnail(
                "https://pa1.narvii.com/7423/d6b9d513479d63e4e38136954d9c3c4a21b3b1c9r1-480-360_hq.gif"
            )
            .setDescription(
                "Provides subtle server-side automation. Type **&help** to check my associate, Rosé Bot!"
            )
            .addField(
                `${prefix}imagine`,
                `displays your server membership card, can also look up other members. If you don't have one, type **${prefix}profile**!`
            )
            .addField(`${prefix}profile`, "Customize your server profile!")
            .addField(`${prefix}idea`, "If you have any ideas on how to improve the bot or the server, type them here!")
            .addField(
                "🍻-sinnerscorner",
                "main chat - if you're not sure where to say what you want to say, say it here." +
                " 18+ chat"
            )
            .addField(
                "🍞🍷-christian-kaaba",
                "holy chat - have a prayer request, or something else serious, this is the place." +
                " There is no shame here, please respect each other or face the wrath of Obelisk."
            )
            .addField(
                "🎵-music",
                "put all of Rosé's commands here."
            )
            .addField(
                "🍊-faux-news",
                "for political discourse and discussion. 21+ chat"
            )
            .addField(
                "🤖-bot-testing",
                "for customizing your profile with Kaiba. (and shitposting)"
            )
            .setTimestamp()
            .setFooter(
                "Blue-Eyes White Dragon " + build,
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Jennie_Kim_for_Marie_Claire_Korea_Magazine_on_October_9%2C_2018_%285%29.png"
            );

        message.channel.send(helpEmbed);
        console.log(message.guild.name + ` info was accessed`);

    } catch {
        message.channel.send("Error in processing your request.")
    }
}