const Discord = require('discord.js'),
    mongoose = require('../mongoose'),
    fSchema = require('../schemas/factionSchema'),
    config = require('../config.json'),
    prefix = config.prefix,
    ownerID = config.ownerID
lbProc = require('../features/features/point-system/lb-proc'),
    moment = require('moment')

module.exports = (client) => {

    client.on('voiceStateUpdate', (oldState, newState) => {

        const userID = oldState.member.user.id;
        const guildID = newState.guild.id

        // check for bot
        //if (oldState.member.user.bot) return;

        if (oldState.channelID === newState.channelID) {

        }

        if (oldState.channelID != null && newState.channelID != null && newState.channelID != oldState.channelID) {

        }

        if (newState.channelID != null & oldState.channelID == null) {
            console.log(`${oldState.member.user.id} joined!`)

            const oldTime = moment();
            setOldTime(client, guildID, userID, oldTime)
        }

        if (oldState.channelID != null && newState.channelID === null) {

            console.log(`${oldState.member.user.id} left!`)

            const newTime = moment()
            vcProc(client, guildID, userID, newTime)
        }

    })

    client.on('message', async message => {

        if (message.author.bot || message.content.startsWith("&")) return;
        if (message.channel instanceof Discord.DMChannel) {
            return client.users.get(ownerID).send(message)
        }

        const { client, guild, member } = message

        const xpPerMsg = 15

        const guildID = guild.id
        const userID = member.id
        try {
            const authorData = await fSchema.findOne({
                guildID,
                userID,
            })

            const now = new Date()

            // check xp cooldown
            if (authorData && authorData.xpCD) {
                const then = new Date(authorData.xpCD)

                const diff = now.getTime() - then.getTime()
                const diffSec = diff / (1000 * 30)

                const seconds = 4
                if (diffSec <= seconds) {

                    return
                }

            }

            addXP(client, guildID, userID, xpPerMsg, message)

            return
        } catch (e) {
            console.log(e)
        }
    })


}

const getNeededXP = level => level * level * 100

const addXP = async (client, guildID, userID, xpToAdd, message) => {

    // deconstruct client from message and restrict RPG messages to the RPG channel

    const lvlChannel = client.channels.cache.get(config.lvlChannel)
    const pointsEmoji = client.emojis.cache.find(emoji => emoji.name === "meso");

    await mongoose().then(async (mongoose) => {

        const now = new Date()

        try {

            await fSchema.findOneAndUpdate({
                guildID,
                userID
            },
                {
                    guildID,
                    userID,
                    xpCD: now
                },
                {
                    upsert: true
                })

            // add xp
            const result = await fSchema.findOneAndUpdate({
                guildID,
                userID,
            }, {
                guildID,
                userID,
                $inc: {
                    xp: xpToAdd
                }
            }, {
                upsert: true,
                new: true
            })

            let { xp, level, points, } = result
            const needed = getNeededXP(level)

            // if level up
            if (xp >= needed) {

                let pointsToAdd = 10

                ++level
                xp -= needed
                const remainingXP = (getNeededXP(level) - xp)
                lvlChannel.send(`<@${userID}> LEVEL UP! You are now level **${level}** with ${xp} experience, and **+ ${pointsToAdd}** ${pointsEmoji}. 
                 You now need ${remainingXP} XP to level up again.`)

                // job advancement checkpoints
                if (level === 2) {
                    firstClass(client, guildID, userID, message)
                }

                if (level === 8) {
                    secondClass(client, guildID, userID, message)
                }

                await fSchema.updateOne({
                    guildID,
                    userID,
                },
                    {
                        level,
                        xp,
                    }
                )

                await fSchema.findOneAndUpdate({
                    guildID,
                    userID,
                }, {
                    guildID,
                    userID,
                    $inc: {
                        points: pointsToAdd
                    }
                }, {
                    upsert: true,
                    new: true
                })

                return

            }

        } finally {
            lbProc(client)
        }

    })
}

async function firstClass(client, guildID, userID, message) {

    const lvlChannel = client.channels.cache.get(config.lvlChannel)

    try {

        let lvlEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("You just reached a job advancement, please select a class.")
            .setDescription(`Draw, <@${userID}>! It's your move.`)
            .addFields(
                {
                    name: '1) Warrior', value: `Whether it be for honor and glory, fortune or fame, the thrill of being up close and staring your foes in the eyes - that they know **YOU** have bested them through skill, talent, or strength is one that cannot be experienced than in the thick of it. \n
            Pray to your God, bolster your fighting spirit, sharpen your blade, and steel yourself - as soon, all will hear of your massive gains. \n ` },
                {
                    name: '2) Ranger', value: (`Perhaps you're a hunter, a minstrel, archer, or gunslinger. Arm yourself and get acquainted to one of these classic ranger weapons: bows, crossbows, slings, throwing weapons, ***gun***. \n 
            Regardless, you prefer to stay at range - laying waste to your enemies before they can even come close to touching you. \n
            The world has many treasure, stories, and secrets to unfold, and you're just the right person to hunt them down. \n ` )
                },
                {
                    name: '3) Mage', value: `Whether through random circumstance, born talent, or excruciating study, you have just elected to hone your magic power. \n 
            The longer your journey goes, the deeper your knowledge becomes of not only the arcane arts, but yourself, as you discover what exactly the source of this power is. \n ` },
                { name: '4) Thief', value: `You're a thief.` }
            )
            .setFooter('Duelist Kingdom')
        let leMSG = await lvlChannel.send(lvlEmbed);
        let filter = (m) => m.author.id === userID;
        let query = await lvlChannel.awaitMessages(filter, {
            max: 1,
        });

        let results = query.first().content;

        if (results === `${prefix}cancel`) {
            return message.reply("I end my turn.");
        } else {
            if (results === "1") {
                await fSchema.updateOne({
                    guildID,
                    userID,
                }, {
                    guildID,
                    userID,
                    class: "Warrior"
                }, {
                    upsert: true,
                    new: true
                })
                return lvlChannel.send(`You too, dance with Balrogs.
                    I end my turn.`)
            }
            if (results === "2") {
                await fSchema.updateOne({
                    guildID,
                    userID,
                }, {
                    guildID,
                    userID,
                    class: "Ranger"
                }, {
                    upsert: true,
                    new: true
                })
                return lvlChannel.send(`So are your *pew pew pew* or **BOOM BOOM BOOM**?
                    I end my turn.`)
            }
            if (results === "3") {
                await fSchema.updateOne({
                    guildID,
                    userID,
                }, {
                    guildID,
                    userID,
                    class: "Mage"
                }, {
                    upsert: true,
                    new: true
                })
                return lvlChannel.send
                    (`You are literally only **BOOM BOOM BOOM**.
                        I end my turn.`)
            }
            if (results === "4") {
                await fSchema.updateOne({
                    guildID,
                    userID,
                }, {
                    guildID,
                    userID,
                    class: "Thief"
                }, {
                    upsert: true,
                    new: true
                })
                return lvlChannel.send(`lulthIeFt
                    I end my turn.`)
            }
            return newClass
        }
    } catch {
        lvlChannel.send(`Did not get a specified class`);
        return firstClass(client, guildID, userID, message);
    }
}

async function secondClass(client, guildID, userID, message) {

    try {
        const lvlChannel = client.channels.cache.get(config.lvlChannel)
        const advMage = require('../profile-system/classes/mage/mage-2')
        const advWarrior = require('../profile-system/classes/warrior/warrior-2')
        const advRange = require('../profile-system/classes/ranger/ranger-2')
        const advThief = require('../profile-system/classes/thief/thief-2')

        const firstClassData = await fSchema.findOne({
            guildID,
            userID,
        })

        var faction = firstClassData.faction;

        if (faction === "Ra's Giga Chickens") {
            var god = "Ra"
        } else if (faction === "Obelisk's Tormentors") {
            var god = "Obelisk"
        } else if (faction === "Slifer's Production Crew") {
            var god = "Slifer"
        }

        if (firstClassData.class === "Mage") {
            advMage.secondMage(client, guildID, userID, lvlChannel, god)
        }
        else
            if (firstClassData.class === "Warrior") {
                advWarrior.secondWarrior(client, guildID, userID, lvlChannel, god)
            }
            else
                if (firstClassData.class === "Ranger") {
                    advRange.secondRange(client, guildID, userID, lvlChannel, god)
                }
                else
                    if (firstClassData.class === "Thief") {
                        advThief.secondThief(client, guildID, userID, lvlChannel, god)
                    }
                    else {
                        return console.log("Somebody leveled up without getting a prompt")
                    }
    } catch (e) {
        console.log(e)
    }
}
// log when user joined a vc
async function setOldTime(client, guildID, userID, oldTime) {
    try {
        const otData = await fSchema.findOneAndUpdate({
            guildID,
            userID,
        }, {
            guildID,
            userID,
            lastJoined: oldTime
        }, {
            upsert: true,
            new: true
        })

    } catch {
        return otData
    }

}

// accumulate XP from being connected to voice channel
async function vcProc(client, guildID, userID, newTime) {
    try {
        // query old voice time
        const userData = await fSchema.findOne({
            guildID,
            userID,
        })

        const oldTime = userData.lastJoined
        console.log(oldTime)
        const diffTime = moment.duration(newTime.diff(oldTime)).asMinutes();

        await fSchema.findOneAndUpdate({
            guildID,
            userID,
        }, {
            guildID,
            userID,
            $inc: {
                vcCD: diffTime
            }
        })

        return
    } catch {
        return userData
    }
}

async function cashOut(client, guildID, userID, vcToxp) {

    addXP(client, guildID, userID, vcToxp)

    try {
        const userData = await fSchema.findOneAndUpdate({
            guildID,
            userID,
        },
            {
                guildID,
                userID,
                vcCD: 0
            },
            {
                upsert: true,
                new: true
            })


    } catch {
        return userData
    }
}

module.exports.addXP = addXP;
module.exports.cashOut = cashOut;