// main combat handler
const Discord = require('discord.js')
const { prefix } = require('../config.json')
const classSchema = require('../schemas/classSchema')
const mongoose = require('../mongoose');
const factionSchema = require('../schemas/factionSchema');
const mobSchema = require('../schemas/mobSchema');
const levels = require('../point-system/levels')

const player = require('./player-handler')
const spell = require('./spell-handler')

module.exports = {
    async setCombat(message) {

        await mongoose().then(async (mongoose) => {

            // build the lobby embed that gives users information on the combat module
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

            // allow users to choose to embark on an adventure or quit
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

                // look for a random enemy from the list. Enemy types include: mob, tier 3, tier 2, tier 1, and raid boss monsters.
                const findMobData = await mobSchema.aggregate([{
                    $match: {
                        type: "mob"
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
                            encounter(message, combatEmbed, reaction, userData, mobData)
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

    async combatProc(message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, userDMG, mobDMG, turn, minDMG, maxDMG) {

        // clear fields to refill them with new content 
        combatEmbed.fields = [];
        combatEmbed.setImage('')

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
        let { class: className, spell1, spell2, spell3 } = userData
        let { mobName, mp: mobMP, img: mobIMG, description: mobDESC, } = mobData

        // get the new HP/MP of both entities after each iteration of damage
        let newMobHP = mobHP - userDMG
        let newUserHP = userHP - mobDMG
        let newUserMP = Math.floor(userMP - 0.4) + 2

        try {

            // update the new HP to mongo
            const changedUserData = await classSchema.findOneAndUpdate(
                {
                    guildID,
                    userID,
                },
                {
                    hp: newUserHP,
                    mp: newUserMP
                },
                {
                    upsert: true,
                    new: true,
                }
            )

            // new mob HP
            var mobHP = [newMobHP]

            // look for the stats of the current mob
            const changedMobData = await mobSchema.findOne({
                mobName
            })

            // rebuild new embed
            combatEmbed
                .setFooter('Turn ' + turn)
                .addFields(
                    { name: message.author.username, value: `\`\`\`HP: ${newUserHP} \nMP: ${newUserMP} \nSTR: ${userSTR} \nDEX: ${userDEX} \nINT: ${userINT} \nLUK: ${userLUK} \`\`\``, inline: true },
                    { name: `${mobName}`, value: `\`\`\`HP: ${mobHP} \nMP: ${mobMP} \nSTR: ${mobSTR} \nDEX: ${mobDEX} \nINT: ${mobINT} \nLUK: ${mobLUK}\`\`\``, inline: true },
                    { name: '\u200b', value: '\u200b' }
                )

            // fill the rest of the embed with user-specific data
            player.checkUser(combatEmbed, userData)
            adReaction.message.edit(combatEmbed)
            adReaction.message.reactions.removeAll()

            // await user to make their turn with reactions
            let confirm = await adReaction.message.edit(combatEmbed)
            await confirm.react("✅")
            await confirm.react("📜")
            await confirm.react("1️⃣")
            // await confirm.react("2️⃣")
            // await confirm.react("3️⃣")
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
                let newUserHP = userHP - jhinCrit

                combatEmbed
                    .setFooter('Turn 4')
                    .setTitle("It's your Curtain Call.")
                    .setDescription(`**"FOUR"** \n ${mobName} crit you for **${jhinCrit}** damage.`)
                    .setImage('https://media1.tenor.com/images/9adc8ea4b25fdc6fb763f804ac8d9f5e/tenor.gif?itemid=18865199')
                adReaction.message.edit(combatEmbed)
                adReaction.message.reactions.removeAll()

                const changedUserData = await classSchema.findOneAndUpdate({
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
            else if (userHP <= 0 || newUserHP <= 0) {
                combatEmbed.setDescription("\`\`You probably should have stayed by the bonfire.\`\`")
                    .setImage('https://media1.tenor.com/images/9adc8ea4b25fdc6fb763f804ac8d9f5e/tenor.gif?itemid=18865199')
                adReaction.message.edit(combatEmbed)
                return message.channel.send("Duel end.");

                // check if mob is 0 HP
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
            } else if (userHP <= 0 && mobHP <= 0) {
                message.reply("Draw.. You run back to the bonfire before suffering any further damage..")
            }

            // if everyone still has HP, move on to the next turn

            // basic attack
            if (reaction.emoji.name === "✅") {

                // calculate potential damage
                return player.calcUserDMG(message, combatEmbed, adReaction, changedUserData, newUserHP, newUserMP, userSTR, userDEX, userINT, userLUK, changedMobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG,)

            }
            // basic magic attack
            else if (reaction.emoji.name === "📜") {

                // calculate potential damage
                return player.calcUserMagDMG(message, combatEmbed, adReaction, changedUserData, newUserHP, newUserMP, userSTR, userDEX, userINT, userLUK, changedMobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG,)

            }
            else if (reaction.emoji.name === "1️⃣") {

                // calculate spell damage
                spell.checkSpell(message, combatEmbed, adReaction, changedUserData, newUserHP, newUserMP, userSTR, userDEX, userINT, userLUK, changedMobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG, spell1)

            }

            // run from combat
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

// set up the first encounter embed
async function encounter(message, combatEmbed, adReaction, userData, mobData) {

    var turn = 0;
    const { guild, member } = message
    const guildID = guild.id
    const userID = member.id
    combatEmbed.fields = [];

    let { class: className, spell1, spell2, spell3 } = userData
    let { mobName, mp: mobMP, description: mobDESC, img: mobIMG } = mobData

    // min and max are affected by user equipped weapon
    var minDMG = 40
    var maxDMG = 80

    // put default stats into editable arrays for individual instances
    const mobHP = [mobData.hp]
    const mobSTR = [mobData.str]
    const mobDEX = [mobData.dex]
    const mobINT = [mobData.int]
    const mobLUK = [mobData.luk]
    const userHP = [userData.hp]
    const userMP = [userData.mp]
    const userSTR = [userData.str]
    const userDEX = [userData.dex]
    const userINT = [userData.int]
    const userLUK = [userData.luk]

    // first encounter!
    combatEmbed
        .setTitle(`${mobDESC}`)
        .setFooter('Encounter!')
        .setThumbnail(mobIMG)
        .setDescription(`React with "✅" to make a basic weapon attack, "📜" to cast a basic magic attack, "1️⃣", "2️⃣", "3️⃣" for the corresponding spells, or "❎" to run!`)
        .addFields(
            { name: message.author.username, value: `\`\`\`HP: ${userHP} \nMP: ${userMP} \nSTR: ${userSTR} \nDEX: ${userDEX} \nINT: ${userINT} \nLUK: ${userLUK} \`\`\``, inline: true },
            { name: `${mobName}`, value: `\`\`\`HP: ${mobHP} \nMP: ${mobMP} \nSTR: ${mobSTR} \nDEX: ${mobDEX} \nINT: ${mobINT} \nLUK: ${mobLUK}\`\`\``, inline: true },
            { name: '\u200b', value: '\u200b' }
        )

    // fill embed with user-specific values
    player.checkUser(combatEmbed, userData)
    adReaction.message.edit(combatEmbed)
    adReaction.message.reactions.removeAll()

    // first action of combat: basic attack, basic magic attack, spell 1 - 3, or run
    let confirm = await adReaction.message.edit(combatEmbed)
    await confirm.react("✅")
    await confirm.react("📜")
    await confirm.react("1️⃣")
    //await confirm.react("2️⃣")
    // await confirm.react("3️⃣")
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
        player.calcUserDMG(message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG,)

    } else if (reaction.emoji.name === "📜") {

        // calculate basic magic damage
        player.calcUserMagDMG(message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG,)

    } else if (reaction.emoji.name === "1️⃣") {

        // calculate spell damage
        spell.checkSpell(message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG, spell1)

    } else if (reaction.emoji.name === "2️⃣") {

        // calculate spell damage
        spell.checkSpell(message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG, spell2)


    } else if (reaction.emoji.name === "3️⃣") {

        // calculate spell damage
        spell.checkSpell(message, combatEmbed, adReaction, userData, userHP, userMP, userSTR, userDEX, userINT, userLUK, mobData, mobHP, mobSTR, mobDEX, mobINT, mobLUK, turn, minDMG, maxDMG, spell3)

    }

    else {
        return message.reply(`You choose to stay in the safety of the **bonfire**. 
                        Good choice.`)
    }

}



