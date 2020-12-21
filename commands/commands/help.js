// bot & server information
const Discord = require("discord.js");
const { prefix, build } = require('../../config.json')

module.exports = {

    commands: ['help'],
    description: "Describes all of this bot's commands",
    callback: (message) => {
        try {
            const helpEmbed = new Discord.MessageEmbed()
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
                    "Provides erver-side automation. Type **&help** to check my associate, Rosé Bot!"
                )
                .addField(`\u200B`, `\u200B`)
                .addField(`${prefix}profile`, `Customize your server profile! Type **${prefix}imagine** to check out yours!`)
                .addField(`${prefix}sort`, "sort teams! Useful for league and stuff.")
                .addField(`${prefix}rpg`, `find out more about our in-server rpg, **Duelist Kingdom**.`)
                .addField(`&help`, `Check out our server's music-bot, **Rosé**.`)
                .addField(`\u200B`, `\u200B`)
                .addField(
                    "🍻-sinnerscorner",
                    "main chat - if you're not sure where to say what you want to say, say it here." +
                    " 18+ chat"
                )
                .addField(
                    "🍞🍷-tabernacle",
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
                    "Duelist Kingdom",
                    "Type all of your game-related commands here"
                )
                .setTimestamp()
                .setFooter(
                    "Blue-Eyes White Dragon " + build,
                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Jennie_Kim_for_Marie_Claire_Korea_Magazine_on_October_9%2C_2018_%285%29.png"
                );

            message.channel.send(helpEmbed);
            console.log(message.guild.name + ` info was accessed`);

        } catch (e) {
            message.channel.send("Error in processing your request.")
            console.log(e)
        }
    }
}