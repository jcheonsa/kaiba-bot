const Discord = require('discord.js')
const { prefix } = require('../config.json')
const classSchema = require('../schemas/classSchema')
const mongoose = require('../mongoose');
const factionSchema = require('../schemas/factionSchema');
const mobSchema = require('../schemas/mobSchema');
const levels = require('../point-system/levels')

const player = require('./player-handler')
const enemy = require('./mob-handler')
const spell = require('./spell-handler')
const checkStatus = require('./status-handler')

const YouTube = require("simple-youtube-api")
const youtube = new YouTube(youtube_api)
const ytdl = require("ytdl-core");

module.exports = {
    async setCombat(message, client) {

        await mongoose().then(async (mongoose) => {

            const { guild, member } = message
            const guildID = guild.id
            const userID = member.id

            const combatEmbed = new Discord.MessageEmbed()
                .setThumbnail('https://cdn.dribbble.com/users/460316/screenshots/2673322/darksouls800x600.gif')
                .setAuthor('PLEASE READ')
                .setDescription(`\`\`\`Bonfire\`\`\` \n Working on turn-based combat. **STR/DEX** affects how much basic attack damage is dealt. **INT** scales all magical spells. And every class has a spell that scales with their **main stat**. \n
                React with "✅" to make a basic weapon attack, "📜" to cast a basic magic attack, "1️⃣", "2️⃣", "3️⃣" for the corresponding spells, or "❎" to run!\n Wait for all of the emotes to load before reacting. \n If you have any suggestions or ideas on improving the system, let me know. <@${guild.owner.id}> 
                \n \u200B`)
                .addFields(
                    {
                        name: `This week's raid boss: \`\`Jhin\`\``, value: `"I bloom.. Like a flower in the dawn.."
                       \n  \u200B \u200B `
                    })
                .setFooter(`the crackle of the bonfire soothes your soul.. warms your body.. and replenishes your spirit..`)

            try {

                let confirm = await message.channel.send(combatEmbed)
                await confirm.react("✅")
                await confirm.react("❎")

                let reactionFilter = (reaction, user) =>
                    user.id === userID && !user.bot;
                let reaction = (
                    await confirm.awaitReactions(reactionFilter, {
                        max: 1,
                        time: 80000,
                    })
                ).first();

                // find user data
                const userData = await classSchema.findOne({
                    guildID,
                    userID: member.id,
                },
                )

                // look for a random mob from the list
                const findMobData = await mobSchema.aggregate([{
                    $match: {
                        mobName: "Jhin"
                    }
                }])
                const mobData = findMobData[Math.floor(Math.random() * findMobData.length)];
                console.log(mobData)

                if (reaction.emoji.name === "✅") {

                    // check if user is 0 HP
                    if (userData.hp <= 0) {
                        combatEmbed.fields = [];
                        combatEmbed
                            .setTitle("\`\`\`Bonfire\`\`\`")
                            .setDescription(`**Wait!** 
                            Stay by the bonfire and **${prefix}rest**, you have ${userData.hp} HP right now..`)
                            .setThumbnail('https://cdn.dribbble.com/users/460316/screenshots/2673322/darksouls800x600.gif')
                        reaction.message.edit(combatEmbed)
                        return;

                    } else {
                        // loading screen
                        combatEmbed.fields = [];
                        combatEmbed
                            .setTitle("")
                            .setDescription("Prithee, be careful..")
                            .setThumbnail("")
                            .setImage("https://i.imgur.com/Q6uJ7Pj.gif")
                            .setFooter('the light of the bonfire dims.. and so does your sense of safety..')
                        reaction.message.edit(combatEmbed)

                        combatEmbed.setImage('')
                        setTimeout(function () {
                            encounter(message, combatEmbed, reaction, userData, mobData, client)
                        }, 6000);

                    }
                }

                else if (reaction.emoji.name === "❎") {

                    message.reply(`You choose to stay in the safety of the **bonfire**. 
                        Good choice.`)
                    return mongoose.connection.close()
                }

            } catch (e) {
                console.log(e)
                return message.reply(`Either timed out or you did not register for the combat demo. Use **${prefix}reg** to register!
                    You must be at least level 2 to fight!`)
            }

        })
    },

    async combatProc(message, combatEmbed, adReaction, user, mob, userDMG, mobDMG, turn,) {

        // random combat flavor text
        let random = Math.floor(Math.random() * 5);
        const mobMoves = [
            "just freaking curb stomps you for",
            "deals",
            "absolutely eviscerates you for",
            "isn't trying but still did",
            "scoffs and bops you for"
        ]

        // increase turn & declare constants
        turn++;
        const { client, guild, member } = message
        const guildID = guild.id
        const userID = member.id

        // deconstruct objects from mongo

        var { Name: mobName, mobstatus: status, mobstatusTimer: statusTimer } = mob
        var { spell1, spell2, spell3, minDMG, maxDMG, status, statusTimer } = user

        // clear fields to refill them with new content 
        combatEmbed.fields = [];
        combatEmbed.setImage('')

        var userStatusDMG = 0
        var mobStatusDMG = 0

        if (mobstatus != "normal") {

            if (mobstatus === "paralyze" || mobstatus === "frozen") {
                var mobDMG = 0
            }
            var mobStatusDMG = checkStatus.checkStatus(message, combatEmbed, user, mob)

            var newMobHP = mob.HP - mobStatusDMG[0];
            var mobstatus = mobStatusDMG[1];
            var mobstatusTimer = mobStatusDMG[2];

            var mobHP = newMobHP

        }

        if (status != "normal") {

            var userStatusDMG = checkStatus.checkStatus(message, combatEmbed, mob, user,)
        }

        // get the new HP of both entities after the last loop of damage
        var newMobHP = mob.HP - userDMG
        var newUserHP = user.HP - mobDMG

        try {

            // update the new HP to mongo
            await classSchema.findOneAndUpdate(
                {
                    guildID,
                    userID,
                },
                {
                    hp: newUserHP,
                    mp: user.MP
                },
                {
                    upsert: true,
                    new: true,
                }
            )

            // new mob HP
            var mobHP = [newMobHP]

            // look for the stats of the current mob
            await mobSchema.findOne({
                mobName
            })

            // rebuild new embed
            combatEmbed
                .setFooter('Turn ' + turn + ' /Your Status: ' + status + ' /Enemy Status: ' + mobstatus)
                .addFields(
                    { name: message.author.username, value: `\`\`\`HP: ${newUserHP} \nMP: ${user.MP} \nSTR: ${user.STR} \nDEX: ${user.DEX} \nINT: ${user.INT} \nLUK: ${user.LUK} \`\`\``, inline: true },
                    { name: `${mobName}`, value: `\`\`\`HP: ${mobHP} \nMP: ${mob.MP} \nSTR: ${mob.STR} \nDEX: ${mob.DEX} \nINT: ${mob.INT} \nLUK: ${mob.LUK}\`\`\``, inline: true },
                    { name: '\u200b', value: '\u200b' }
                )

            player.checkUser(combatEmbed, user)
            adReaction.message.edit(combatEmbed)
            adReaction.message.reactions.removeAll()

            var changedMob = {
                Name: mobName,
                HP: newMobHP,
                MP: mob.MP,
                STR: mob.STR,
                DEX: mob.DEX,
                INT: mob.INT,
                LUK: mob.LUK,
                status: mobstatus,
                statusTimer: mobstatusTimer
            }
            var changedUser = {
                class: user.class,
                HP: newUserHP,
                MP: user.MP,
                STR: user.STR,
                DEX: user.DEX,
                INT: user.INT,
                LUK: user.LUK,
                status: status,
                statusTimer: statusTimer,
                spell1,
                spell2,
                spell3,
                minDMG,
                maxDMG,
            }

            // await user to take their turn with reactions
            let confirm = await adReaction.message.edit(combatEmbed)
            await confirm.react("✅")
            await confirm.react("📜")
            await confirm.react("1️⃣")
            await confirm.react("2️⃣")
            await confirm.react("3️⃣")
            await confirm.react("❎")

            let reactionFilter = (reaction, user) =>
                user.id === userID && !user.bot;
            let reaction = (
                await confirm.awaitReactions(reactionFilter, {
                    max: 1,
                    time: 80000,
                })
            ).first();

            // clear fields after react to fill with new content
            combatEmbed.fields = [];

            // check for raid boss Jhin
            if (mobName === "Jhin" && turn === 3) {

                const jhinCrit = 4444
                let newUserHP = user.HP - jhinCrit

                combatEmbed
                    .setFooter('Turn 4')
                    .setTitle("It's your Curtain Call.")
                    .setDescription(`**"FOUR"** \n ${mobName} crit you for **${jhinCrit}** damage.`)
                    .setImage('https://media1.tenor.com/images/9adc8ea4b25fdc6fb763f804ac8d9f5e/tenor.gif?itemid=18865199')
                adReaction.message.edit(combatEmbed)
                adReaction.message.reactions.removeAll()

                await classSchema.findOneAndUpdate({
                    guildID,
                    userID,
                },
                    {
                        hp: newUserHP,
                    },
                    {
                        upsert: true,
                        new: true,
                    }
                )
                return message.reply("You let Jhin count to **four**.")
            }

            // check if user is 0 HP
            else if (user.HP <= 0 || newUserHP <= 0) {
                combatEmbed.setDescription("\`\`You probably should have stayed by the bonfire.\`\`")
                    .setImage('https://media1.tenor.com/images/9adc8ea4b25fdc6fb763f804ac8d9f5e/tenor.gif?itemid=18865199')
                adReaction.message.edit(combatEmbed)
                return message.channel.send("Duel end.");

                // check if mob is 0 HP
            } else if (mob.HP <= 0 || newMobHP <= 0) {

                let xptoAdd = Math.floor(Math.random() * (3 - 1) + 1);
                let goldtoAdd = Math.floor(Math.random() * (105 - 1));

                combatEmbed.setDescription("You won!")
                    .setTitle('WINNER')
                    .setImage('https://media.tenor.com/images/1dedfa938393c73a0bd1bcd27cd051ce/tenor.gif')
                adReaction.message.edit(combatEmbed)

                levels.addXP(client, guildID, userID, xptoAdd, message)

                return message.channel.send(`Duel end.
            **+ ${xptoAdd}** XP! Also + **${goldtoAdd}** GP!`);
            } else if (user.HP <= 0 && mob.HP <= 0) {
                message.reply("Draw.. You run back to the bonfire before suffering any further damage..")
            }

            // if everyone still has HP, calculate dmg

            // basic attack
            if (reaction.emoji.name === "✅") {

                // calculate potential damage
                return player.calcUserDMG(message, combatEmbed, adReaction, changedUser, changedMob, turn,)

            }
            else if (reaction.emoji.name === "📜") {

                return player.calcUserMagDMG(message, combatEmbed, adReaction, changedUser, changedMob, turn,)

            }
            else if (reaction.emoji.name === "1️⃣") {

                // calculate spell damage
                spell.checkSpell(message, combatEmbed, adReaction, changedUser, changedMob, turn, changedUser.spell1,)

            }
            else if (reaction.emoji.name === "2️⃣") {

                // calculate spell damage
                spell.checkSpell(message, combatEmbed, adReaction, changedUser, changedMob, turn, changedUser.spell2,)

            }
            else if (reaction.emoji.name === "3️⃣") {

                // calculate spell damage
                spell.checkSpell(message, combatEmbed, adReaction, changedUser, changedMob, turn, changedUser.spell3,)

            }

            else if (reaction.emoji.name === "❎") {
                if (userHP <= 0 || newUserHP <= 0) {

                    combatEmbed.setDescription("You probably should have stayed by the bonfire.")

                        .setImage('https://media1.tenor.com/images/9adc8ea4b25fdc6fb763f804ac8d9f5e/tenor.gif?itemid=18865199')
                    adReaction.message.edit(combatEmbed)
                    return message.channel.send("Duel end.");
                } else if (mobHP <= 0 || newMobHP <= 0) {
                    let xptoAdd = Math.floor(Math.random() * (3 - 1) + 1);
                    let goldtoAdd = Math.floor(Math.random() * (105 - 1));
                    combatEmbed.setDescription("You won!")
                        .setTitle('WINNER')
                        .setImage('https://media.tenor.com/images/1dedfa938393c73a0bd1bcd27cd051ce/tenor.gif')
                    adReaction.message.edit(combatEmbed)

                    levels.addXP(client, guildID, userID, xptoAdd, message)

                    return message.channel.send(`Duel end.
                    **+ ${xptoAdd}** XP! Also + **${goldtoAdd}** GP!`);
                }
                else
                    return message.reply("You run for your life.")
            }

        } catch (e) {
            console.log(e)
        }

    }

}

async function encounter(message, combatEmbed, adReaction, userData, mobData, client) {

    // init timers
    var turn = 0;
    var status = "normal";
    var statusTimer = 0;
    var mobstatus = "normal";
    var mobstatusTimer = 0;

    const { guild, member } = message
    const guildID = guild.id
    const userID = member.id
    combatEmbed.fields = [];

    let { description: mobDESC, img: mobIMG, status: boss } = mobData

    if (boss === "boss") {
        bossMusic(message, client, mobData)
    }

    // min and max are affected by user equipped weapon
    var minDMG = 40
    var maxDMG = 80
    var armor = 100
    var equipStats = {
        minDMG: minDMG,
        maxDMG: maxDMG,
        armor: armor,
        turn: turn,
    }

    // put default stats into editable objects for individual instances
    const userClass = userData.class
    const userHP = userData.hp
    const userMP = userData.mp
    const userSTR = userData.str
    const userDEX = userData.dex
    const userINT = userData.int
    const userLUK = userData.luk
    const spell1 = userData.spell1
    const spell2 = userData.spell2
    const spell3 = userData.spell3

    const mobName = mobData.mobName
    const mobHP = mobData.hp
    const mobMP = mobData.mp
    const mobSTR = mobData.str
    const mobDEX = mobData.dex
    const mobINT = mobData.int
    const mobLUK = mobData.luk

    var mob = {
        Name: mobName,
        HP: mobHP,
        MP: mobMP,
        STR: mobSTR,
        DEX: mobDEX,
        INT: mobINT,
        LUK: mobLUK,
        status: mobstatus,
        statusTimer: mobstatusTimer

    }

    var user = {
        class: userClass,
        HP: userHP,
        MP: userMP,
        STR: userSTR,
        DEX: userDEX,
        INT: userINT,
        LUK: userLUK,
        status: status,
        statusTimer: statusTimer,
        spell1: spell1,
        spell2: spell2,
        spell3: spell3,
        minDMG: minDMG,
        maxDMG: maxDMG,
    }

    // first encounter!
    combatEmbed
        .setTitle(`${mobDESC}`)
        .setFooter(`Encounter!` + ' /Your Status: ' + user.status + ' /Enemy Status: ' + mob.status)
        .setThumbnail(mobIMG)
        .setDescription(`React with "✅" to make a basic weapon attack, "📜" to cast a basic magic attack, "1️⃣", "2️⃣", "3️⃣" for the corresponding spells, or "❎" to run!`)
        .addFields(
            { name: message.author.username, value: `\`\`\`HP: ${user.HP} \nMP: ${user.MP} \nSTR: ${user.STR} \nDEX: ${user.DEX} \nINT: ${user.INT} \nLUK: ${user.LUK} \`\`\``, inline: true },
            { name: `${mob.Name}`, value: `\`\`\`HP: ${mob.HP} \nMP: ${mob.MP} \nSTR: ${mob.STR} \nDEX: ${mob.DEX} \nINT: ${mob.INT} \nLUK: ${mob.LUK}\`\`\``, inline: true },
            { name: '\u200b', value: '\u200b' }
        )

    console.log(`before passing to check user` + user)

    player.checkUser(combatEmbed, user)
    adReaction.message.edit(combatEmbed)
    adReaction.message.reactions.removeAll()

    let confirm = await adReaction.message.edit(combatEmbed)
    await confirm.react("✅")
    await confirm.react("📜")
    await confirm.react("1️⃣")
    await confirm.react("2️⃣")
    await confirm.react("3️⃣")
    await confirm.react("❎")


    let reactionFilter = (reaction, user) =>
        user.id === userID && !user.bot;
    let reaction = (
        await confirm.awaitReactions(reactionFilter, {
            max: 1,
            time: 80000,
        })
    ).first();

    if (reaction.emoji.name === "✅") {

        // calculate potential damage
        player.calcUserDMG(message, combatEmbed, adReaction, user, mob, turn,)

    } else if (reaction.emoji.name === "📜") {

        // calculate user spell damage
        player.calcUserMagDMG(message, combatEmbed, adReaction, user, mob, turn,)

    } else if (reaction.emoji.name === "1️⃣") {

        // calculate spell damage
        spell.checkSpell(message, combatEmbed, adReaction, user, mob, turn, spell1)

    } else if (reaction.emoji.name === "2️⃣") {

        spell.checkSpell(message, combatEmbed, adReaction, user, mob, turn, minDMG, maxDMG, spell2, status, statusTimer, mobstatus, mobstatusTimer)


    } else if (reaction.emoji.name === "3️⃣") {
        spell.checkSpell(message, combatEmbed, adReaction, user, mob, turn, minDMG, maxDMG, spell3, status, statusTimer, mobstatus, mobstatusTimer)


    }

    else {
        return message.reply(`You choose to stay in the safety of the **bonfire**. 
                        Good choice.`)
    }

}

async function bossMusic(message, client, mobData) {

    const queue = new Map();
    const serverQueue = queue.get(message.guild.id);
    queue.delete(message.guild.id)

    let { mobName, description: mobDESC, } = mobData

    if (mobName === "Jhin") {
        var bmURL = "https://www.youtube.com/watch?v=LD0ijdzIkrk"
        var bName = "Jhin - Don't let him count to four."
        var bDesc = `
            "Lol 4."`
    }
    else if (mobName === "Lady of the Clock Tower") {
        var bmURL = "https://youtu.be/UfzUSofx-6E"
        var bName = "Lady of the Clock Tower"
        var bDesc = `
            "The bell tolls for thee.."`
    }

    else if (mobName === "Ten Thousand Dragon") {
        var bmURL = "https://www.youtube.com/watch?v=nY_aLj2b70s"
        var bName = mobName
        var bDesc = `
            "Time's up."`
    }
    else if (mobName === "Imperion Magnum the Superconductive Battlebot") {
        var bmURL = "https://www.youtube.com/watch?v=8pQYtmb-f0w"
        var bName = mobName
        var bDesc = `
            "Go Go Magnet Warriors!"`
    }
    else if (mobName === "The Forbidden One") {
        var bmURL = "https://youtu.be/BGxYef6pmN0"
        var bName = mobName
        var bDesc = `
            "xd"`
    }
    else if (mobName === "Fighter Joe") {
        var bmURL = "https://youtu.be/BJhF0L7pfo8"
        var bName = mobName
        var bDesc = `
            "The bell tolls for thee.."`
    }
    else if (mobName === "Blue-Eyes Chaos MAX Dragon") {
        var bmURL = "https://www.youtube.com/watch?v=p4IMtnD7K4g"
        var bName = "Seto Kaiba"
        var bDesc = `
            "Face me!"`
    }
    else if (mobName === "Neo Blue-Eyes Ultimate Dragon") {
        var bmURL = "https://www.youtube.com/watch?v=p4IMtnD7K4g"
        var bName = "Seto Kaiba"
        var bDesc = `
            "Face me!"`
    }
    else {
        var bmURL = "https://www.youtube.com/watch?v=CBvdme-HvdE"
        var bName = mobName
        var bDesc = `
            ${mobDESC}`
    }

    const video = await youtube.getVideo(bmURL);
    const voiceChannel = message.member.voice.channel;

    const song = {
        title: video.title,
        url: video.url,
        decription: video.description,
        duration: video.duration,
        artist: (video.channel.title).split(" - Topic"),
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
            loop: false,
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        console.log(song)

        message.reply(`Boss Encountered: **${bName}** - ${bDesc}`);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            playBM(
                message.guild,
                queueContruct.songs[0],
                client,
                queue
            );
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    }


}

async function playBM(guild, song, client, queue) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(
            ytdl(
                song.url,
                {
                    highWaterMark: 1 << 25,
                },
                {
                    type: "opus",
                    quality: "highestaudio",
                    filter: "audioonly",
                    bitrate: "auto",
                }
            )
        ) // {highWaterMark: 1024*1024*10}
        .on("finish", () => {
            if (!serverQueue.loop) serverQueue.songs.shift();
            playBM(guild, serverQueue.songs[0], client, queue);
        })
        .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 15);
}

