const Discord = require('discord.js');
const { prefix, build } = require('../../../config.json')
module.exports = {

    commands: ['rpg'],
    cooldown: 10,
    description: "Describes rpg-related commands and functions.",
    callback: (message) => {

        try {
            const { client } = message
            const pointsEmoji = client.emojis.cache.find(emoji => emoji.name === "meso");
            const helpEmbed = new Discord.MessageEmbed()
                .setAuthor(
                    "Seto Kaiba",
                    "https://pbs.twimg.com/profile_images/1161902985808633856/V3_zMF1x.jpg"
                )
                .setColor("#A652BB")
                .setTitle("Duelist Kingdom Server-RPG")
                .setThumbnail("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/627fe721-846f-4f75-ac61-111ca00b27dd/daqj0nl-c26a7f4f-d9fd-4e51-bca4-c1d80cfca8ef.png/v1/fill/w_792,h_757,strp/millennium_puzzle___render_by_alanmac95_daqj0nl-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03NTciLCJwYXRoIjoiXC9mXC82MjdmZTcyMS04NDZmLTRmNzUtYWM2MS0xMTFjYTAwYjI3ZGRcL2RhcWowbmwtYzI2YTdmNGYtZDlmZC00ZTUxLWJjYTQtYzFkODBjZmNhOGVmLnBuZyIsIndpZHRoIjoiPD03OTIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.I9Paq8o-_nto23NmaNjvHhMEQAyY43F3uBrXxdu9vr8")
                .setDescription(
                    `Join a faction. Rep your favorite Egyptian God Monster. Get virtual points. Crush your enemies in weekly events. \n
                    Very much still a work-in-progress, Kaiba Corps. is looking for anyone who wants to write, design, or code for this project. \n
                    Let Kaiba or <@${'104482123125108736'}> know if you want to join the dev team.`
                )
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: `${prefix}imagine`, value: `Displays Duelist Kingdom membership card. Tag a user to check theirs.` },
                    { name: `${prefix}fame`, value: ' **(24 Hour cooldown)** thank somebody for helping you out, giving good advice, or just overall being a cool guy!' },
                    { name: `${prefix}daily`, value: ` **(24 Hour cooldown)** get your daily ${pointsEmoji} and XP rewards.` },
                    { name: `${prefix}faction`, value: `Join a server faction and let everyone know who the greatest Egyptian God Monster really is. (It's Obelisk btw)` },
                    { name: `${prefix}cashout/cash`, value: `Check your voice-chat generated minutes. (Converts to xp)` },
                    { name: `${prefix}myguild/myfaction`, value: `Checks faction information.` },
                    { name: `${prefix}spark`, value: `Go fight something.` },
                    { name: `${prefix}checkmob`, value: `Check out the different encounterable mobs! (Will remove on full release)` },
                    { name: `${prefix}<class-archeytpe>`, value: `Check out information on the different classes in Duelist Kingdom.` },
                    { name: '\u200B', value: '\u200B' },
                )
                .addFields(
                    { name: `The Giga Chickens`, value: 'Justice, Unity, Wisdom, Honor.', inline: true },
                    { name: `The Tormentors`, value: 'Valor, Ambition, Loyalty, Power.', inline: true },
                    { name: `The Production Crew`, value: 'Creativity, Bravery, Cunning, Faith.', inline: true },
                )
                .setFooter(
                    "Blue-Eyes White Dragon " + build,
                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Jennie_Kim_for_Marie_Claire_Korea_Magazine_on_October_9%2C_2018_%285%29.png")
            message.channel.send(helpEmbed);
        } catch (e) {
            console.log(e)
            mongoose.connection.close();
        }
    }

}