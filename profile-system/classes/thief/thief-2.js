// second adv Thief
const Discord = require('discord.js');
const jobadvProc = require('../../models/class-handler')

module.exports = {

    async secondThief(client, guildID, userID, lvlChannel, god) {
        try {
            const oneEmoji = "1️⃣"
            const twoEmoji = "2️⃣"
            const threeEmoji = "3️⃣"
            const fourEmoji = "4️⃣"
            const intEmoji = client.emojis.cache.find(emoji => emoji.name === "Futaba");
            const emojis = [oneEmoji, twoEmoji, threeEmoji, fourEmoji]

            var lvl2Embed = new Discord.MessageEmbed()
                .setAuthor("Thief Second Advancement")
                .setDescription(`Use the reactions to navigate through the advancement menu. \n
            Please wait for the reactions to load slowly before clicking. They take some time. \n
            There are 4 branches for your class. Look through each page, and when you decide on the one you want, press the "✅".`)

            let confirm = await lvlChannel.send(lvl2Embed)

            await confirm.react(intEmoji)

            let reactionFilter = (reaction, user) =>
                user.id === userID && !user.bot;
            let reaction = (
                await confirm.awaitReactions(reactionFilter, {
                    max: 1,
                    time: 80000
                })
            ).first();

            setNinja(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)

        } catch {
            console.log("Stopped listening")
        }
    }
}

async function setNinja(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {

    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Ninja")
            .setImage('https://static.wikia.nocookie.net/yugioh/images/a/a3/NinjaGrandmasterHanzo-SHVA-EN-SR-1E.png/revision/latest?cb=20180817170849')
            .setDescription(`**Ninja** seem to just bee an enigma in the current landscape. But with the return of the blue coats, the chants of the Giga Chickens and the numbers of the Production Crew growing, the hidden village of ninjutsu offers great opportunity for those who want to climb the ranks of their faction.\n
        Equal parts physical yet mystical, these operators of the night employ techniques that others cannot hope to understand. You are offered to learn these techniques, so perhaps you too can one day master them as well.
    \n
    Branches into the **Wind Shinobi (Physical)** and the **Dragon Shinobi (Mystical)**`)
            .addFields(
                {
                    name: "Kunai with Chain", value: `With your kunai with chain, take somebody's spell/skill for yourself.`
                },
                {
                    name: "Ninjutsu Art of Duplication", value: `Shadow clone jutsu, make yourself harder to hit.`
                },
                {
                    name: "Hinotama", value: `Take some time to cast a fire ball jutsu, deal big boi damage.`
                },
            )
            .setFooter(`Page 1 of 4`)

        adReaction.message.edit(lvl2Embed)

        let confirm = await adReaction.message.edit(lvl2Embed)
        await confirm.react(emojis[0])
        await confirm.react(emojis[1])
        await confirm.react(emojis[2])
        await confirm.react(emojis[3])
        await confirm.react("✅")

        let reactionFilter = (reaction, user) =>
            user.id === userID && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();

        if (reaction.emoji.name === emojis[0]) {
            lvl2Embed.fields = [];
            setNinja(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setPeddler(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setCrime(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setHit(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Ninja"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)


        }
    } catch {
        console.log("Stopped listening")
    }

}

async function setPeddler(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {

    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Desert Peddler")
            .setImage('https://ms.yugipedia.com//thumb/e/ea/RaidenHandoftheLightsworn-SDRR-EN-C-1E.png/300px-RaidenHandoftheLightsworn-SDRR-EN-C-1E.png')
            .setDescription(`**Life has value, but the cost of living is steep.** Who could survive in this economy with a clean living? The clanging of wealth taunts you and the vase you stole whispers honeyed words to feed it. \n
            You know how to pick your targets and seem like a normal person of business Afterall, nobody could ever uncover your schemes if you're feeding into their ego.
    Branches into the **Raider** and the **Strategist**`)
            .addFields(
                {
                    name: "Pot of Greed", value: `Reducing your attack by 60%, gain 1-2 points. **Cooldown tbd**`
                },
                {
                    name: `Silvertongue`, value: `Your fame will scale your rewards from combat.`
                },
                {
                    name: "Stickyfingers", value: `5% chance to steal 1 point with 90% attack, when rolling for dailies get an additional (1-4) points.`
                },
            )
            .setFooter(`Page 2 of 4`)
        adReaction.message.edit(lvl2Embed)

        let confirm = await adReaction.message.edit(lvl2Embed)
        await confirm.react(emojis[0])
        await confirm.react(emojis[1])
        await confirm.react(emojis[2])
        await confirm.react(emojis[3])
        await confirm.react("✅")

        let reactionFilter = (reaction, user) =>
            user.id === userID && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();

        if (reaction.emoji.name === emojis[0]) {
            lvl2Embed.fields = [];
            setNinja(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setPeddler(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setCrime(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setHit(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Desert Peddler"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Stopped listening")
    }
}

async function setCrime(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {
    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Mercenary")
            .setDescription(`**The Mercenary** never really fit in and always confrontational. Standing firm in your own ways, leadership has always failed you, faith has lead you astray. \n
            Your faith is in coin and where it's potential lies. Wealth is all you care for and you intend to rake it in. Using organized and meticulous methodology for your gain you work alone, and you do it well. \n
            Branches into the **Excommunicated** and the **Big Brother**`)
            .setImage('https://static.wikia.nocookie.net/yugioh/images/9/97/IgnobleKnightofBlackLaundsallyn-NKRT-EN-PlR-LE.png/revision/latest/scale-to-width-down/300?cb=20141124001701')
            .addFields(
                {
                    name: "Intimidate", value: `Scaling with your defense, you puff up your chest and demand one of two things: 1-3 points, if refused, attack with 1.6 multiplier. If you demand XP (100) instead, 1.2x multiplier upon refusal. **24 Hour Cooldown**`
                },
                {
                    name: "Lone Wolf", value: `With every attack, gain 30XP. Every 10 minutes you don't type you get 5XP.`
                },
                {
                    name: "Hot Take", value: `Say something dumb, magic users lose their concentration and negate their spells for 1 turn. Ranged targets cry their eyes out from laughter (blinded for 1 turn), melee range roll on the floor laughing for 2 turns once per battle.`
                },
            )
            .setFooter(`Page 3 of 4`)
        adReaction.message.edit(lvl2Embed)

        let confirm = await adReaction.message.edit(lvl2Embed)
        await confirm.react(emojis[0])
        await confirm.react(emojis[1])
        await confirm.react(emojis[2])
        await confirm.react(emojis[3])
        await confirm.react("✅")

        let reactionFilter = (reaction, user) =>
            user.id === userID && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();

        if (reaction.emoji.name === emojis[0]) {
            lvl2Embed.fields = [];
            setNinja(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setPeddler(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setCrime(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setHit(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Criminal"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Stopped listening")
    }
}

async function setHit(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {
    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Assassin")
            .setImage('https://ms.yugipedia.com//4/41/GravekeepersAssailant-SS01-EN-C-1E.png')
            .setDescription(`**The cost of living and the price for death you know all too well.** You take coin and in return you take a life. In this lifestyle, you've grown jaded and if anything.. you have becom an efficient worker\n
            Your kills are silent and sometimes made out to look like a tragic mishap, minor parties and the hot fuzz, few know that their deaths were an "accident" of sorts. \n
            Branches into the **${god}'s Hand** and the **Shadow**`)
            .addFields(
                {
                    name: `Dark Coffin`, value: `If you were to be a target for something, let someone else take it instead. **48 Hour Cooldown**`
                },
                {
                    name: "Deathrattle", value: `Subject an opponent to paranoia and anxiety. Unaware of their impending doom, go for the throat and deal 1.5x damage.`
                },
                {
                    name: "Executioner's Instinct", value: `Monsters - 85% hit rate, deals 1.3x dmg. Players - 60% chance to lower defense by striking at the weakpoints.`
                },
            )
            .setFooter(`Page 4 of 4`)
        adReaction.message.edit(lvl2Embed)

        let confirm = await adReaction.message.edit(lvl2Embed)
        await confirm.react(emojis[0])
        await confirm.react(emojis[1])
        await confirm.react(emojis[2])
        await confirm.react(emojis[3])
        await confirm.react("✅")

        let reactionFilter = (reaction, user) =>
            user.id === userID && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();

        if (reaction.emoji.name === emojis[0]) {
            lvl2Embed.fields = [];
            setNinja(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setPeddler(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setCrime(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setHit(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Assassin"
            console.log("meme")
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Something went wrong")
    }
}
