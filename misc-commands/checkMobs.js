const Discord = require('discord.js')
const mobSchema = require('../schemas/mobSchema')


module.exports = {

    commands: ['checkmob'],
    description: "get them mobbies in",
    cooldown: 15,

    callback: async (message) => {

        // showcase the different encounterable mobs in Duelist Kingdom
        const findMobData = await mobSchema.aggregate([{
            $match: {
                type: "mob"
            }
        }])

        var monArr = [];
        let monEmbed = new Discord.MessageEmbed()
            .setTitle("Tier 2")
        for (var i = 0; i < findMobData.length; i++) {
            monArr.push(`${findMobData[i].mobName}`)
        }
        monEmbed.setDescription(monArr)
        message.channel.send(monEmbed)

        const gEmbed = (start) => {
            const current = findMobData.slice(start, start + 1);
            const embed = new Discord.MessageEmbed()
                .setTitle("Bestiary")
                .setColor("RANDOM")
                .setFooter(`Beastiary page ${start + 1}`)
                .setTimestamp();

            current.forEach((mob) => {
                embed
                    .setImage(mob.img)
                    .setDescription(`\`\`\`${mob.mobName}\`\`\` \n ${mob.description}`)
                    .addFields(
                        { name: "STATS", value: `HP: ${mob.hp} \n STR: ${mob.str} \n DEX: ${mob.dex} \n INT: ${mob.int} \n LUK: ${mob.luk}`, inline: true },
                    )
            });
            return embed;
        };

        message.channel.send(gEmbed(0)).then((message) => {
            if (findMobData.length <= 1) return;
            message.react("➡️");
            const collector = message.createReactionCollector(
                (reaction, user) =>
                    ["⬅️", "➡️"].includes(reaction.emoji.name) && !user.bot,
                {
                    time: 60000,
                }
            );
            let cIndex = 0;
            collector.on("collect", (reaction) => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === "⬅️" ? (cIndex -= 1) : (cIndex += 1);
                    message.edit(gEmbed(cIndex));
                    if (cIndex !== 0) await message.react("⬅️");
                    if (cIndex + 1 < findMobData.length) message.react("➡️");
                });
            });
        })


    }
}