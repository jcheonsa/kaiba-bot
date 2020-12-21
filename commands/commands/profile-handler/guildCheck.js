const fSchema = require('../../../schemas/factionSchema')
const Discord = require('discord.js')
const { raRole, obRole, slRole } = require('../../../config.json')

module.exports = {
    
    commands: ["myguild", "myfaction"],
    description: "Returns information on your current faction.",
    cooldown: 25,
    callback: async (message) => {
        message.channel.startTyping();
        const member = message.member
        const { client, guild } = message
        const guildID = guild.id

        const pointsEmoji = message.guild.emojis.cache.find(
            (emoji) => emoji.name === "meso"
        );

        const fameEmoji = message.guild.emojis.cache.find(
            (emoji) => emoji.name === "hotdog"
        );

        let guildEmbed = new Discord.MessageEmbed()
        try {
            if (member.roles.cache.has(raRole)) {

                let members = message.guild.members.cache.filter(m => m.roles.cache.has(raRole) && !m.user.bot)

                guildEmbed.setTitle("Ra's Giga Chickens")
                    .setDescription(`**Justice, Unity, Wisdom, Honor.** \n
                    The First of the God Cards, light of the sun, and guardian of Pharoah's past. The Winged Dragon of Ra is not to be taken lightly.\n 
                    Those who can grasp the powers of Ra will become as mighty as the sun itself. But beware of this power, for many have tried to control Ra and died trying, unable to sustain its power with their feeble lifeforce. \n
                    The current Guild Master of the Giga Chickens, **Rosé** is one of the few exceptions. Those who are worthy must be ambitious, confident, and be full of life. Followers of Ra have already proven themselves to contain the divine beast's 
                    might, they just need to unleash their full potential with the sacred chant. \n 
                    "Great beast of the sky, please hear my cry. Transform thyself from orb of light and bring me victory in this fight. \n 
                    Envelop the desert with your glow and cast your rage upon my foe. Unlock your powers from deep within so that together we may win. 
                    Appear in this Shadow Game as I call out your name, The Winged Dragon of Ra!" \n`)
                    .setThumbnail('https://i.imgur.com/n65d1WV.png')
                    .setAuthor("Bask in his light")
                    .setColor("#f2ed46")
                    .addFields(
                        { name: 'Guild Master - Level 14 K-pop Idol', value: `The Winged Dragon of Rasé`, inline: true },
                        { name: '\u200B', value: '\u200B' },
                    )
                    .setFooter(`ATK: ????   /   DEF: ????`)


                await guildIterator(guildID, members, guildEmbed, pointsEmoji, fameEmoji)
            }
            else
                if (member.roles.cache.has(obRole)) {

                    let members = message.guild.members.cache.filter(m => m.roles.cache.has(obRole) && !m.user.bot)

                    guildEmbed.setTitle("Obelisk's Tormentors")
                        .setDescription(`**Valor, Ambition, Loyalty, Power.** \n
                        Their numbers are few, but with good reason. If you can talk the talk **and** walk the walk, then you will probably find yourself among the ranks of the Tormentors. \n
                        Old tales and stories have been told of this mighty but solitary force; that all that stand between them and their goal are eviscerated life points. \n
                        Only the strongest are adorn with the cerulean blue; the most feared of whom, **Seto Kaiba** is not only the ambition, but the skillset to achieve the impossible. \n
                        With the absence of **YUGI MOTO** in this realm, it may be best to join Obelisk or flee, because the blue coats are indeed coming.`)
                        .setThumbnail('https://i.imgur.com/qPOvvXz.png')
                        .setAuthor("Tremble in his might")
                        .setColor("#2f5ced")
                        .addFields(
                            { name: 'Guild Master - Level 19 Master Duelist', value: `Seto Kaiba`, inline: true },
                            { name: '\u200B', value: '\u200B' },
                        )
                        .setFooter(`ATK: 4000   /   DEF: 4000`)

                    await guildIterator(guildID, members, guildEmbed, pointsEmoji, fameEmoji)
                }
                else
                    if (member.roles.cache.has(slRole)) {

                        let members = message.guild.members.cache.filter(m => m.roles.cache.has(slRole) && !m.user.bot)
                        let slVal = (message.guild.members.cache.filter(m => m.roles.cache.has(slRole)).size)

                        guildEmbed.setTitle("Slifer's Executive Production Team")
                            .setDescription(`**Creativity, Bravery, Cunning, Faith.** \n
                            Everything from rewards to power scales with the number of members in Slifer's Production Crew. As long
                            as the crew remain strong through thick and thin, there is not an obstacle they cannot handle together.\n
                            Taking part in Slifer's ritual, and although what exactly happens during this process is unknown to outsiders, 
                            it has been said that this ritual links each member's very soul to one another - indicated by The Production Crew's trademark crimson tinge in their eyes. \n
                            Under the leadership of **Jisoo**, The Production Crew seeks points/fame stretching toward the heavens, 
                            in hopes of one day even reaching Slifer himself.`)
                            .setThumbnail('https://i.imgur.com/sJGSkhz.png')
                            .setAuthor("Stand in awe of his majesty")
                            .setColor("#e33b3b")
                            .addFields(
                                { name: 'Guild Master - Level 17 K-pop Idol', value: `Jisoo`, inline: true },
                                { name: '\u200B', value: '\u200B' },
                            )

                            .setFooter(`ATK: ${slVal}000   /   DEF: ${slVal}000`)

                        await guildIterator(guildID, members, guildEmbed, pointsEmoji, fameEmoji)
                    }

        } finally {
            message.channel.send(guildEmbed)
            message.channel.stopTyping();
            return;
        }
    }
}

function findGuild(member, guildEmbed, userData, pointsEmoji, fameEmoji) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let added = guildEmbed.addFields(
                {
                    name: `Level ${userData.level} ` + `${userData.class}`, value: `<@${member[0]}> \n`
                        + ` ${pointsEmoji}: ${userData.points}  `
                        + ` ${fameEmoji}: ${userData.fame}  `,
                    inline: true
                }
            );
            resolve(added);
        }, 300);

    })

}

async function guildIterator(guildID, array, guildEmbed, pointsEmoji, fameEmoji) {

    var newMembers = [];
    for (const member of array) {

        var userData = await fSchema.findOne({
            guildID: guildID,
            userID: member[0],
        })

        const newArr = await findGuild(member, guildEmbed, userData, pointsEmoji, fameEmoji);
        newMembers.push(newArr);
    }
    console.log(newMembers[0])

}