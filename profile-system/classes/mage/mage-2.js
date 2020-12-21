// second adv mage
const Discord = require('discord.js');
const jobadvProc = require('../../models/class-handler')

module.exports = {

    async secondMage(client, guildID, userID, lvlChannel, god) {

        try {

            const oneEmoji = "1️⃣"
            const twoEmoji = "2️⃣"
            const threeEmoji = "3️⃣"
            const fourEmoji = "4️⃣"
            const intEmoji = client.emojis.cache.find(emoji => emoji.name === "Futaba");
            const emojis = [oneEmoji, twoEmoji, threeEmoji, fourEmoji]

            var lvl2Embed = new Discord.MessageEmbed()
                .setAuthor("Mage Second Advancement")
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

            setAdept(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)

        } catch {
            console.log("Stopped listening")
        }
    }
}

async function setAdept(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {

    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Mage Adept")
            .setImage('https://static.wikia.nocookie.net/yugioh/images/5/5b/CyberseMagician-MP19-EN-R-1E.png/revision/latest?cb=20200121190607')
            .setDescription(`**The Mage Adept** \n
            Your power comes from within.
    \n
    Branches into the **Chaos Elementalist** and the **Druid**`)
            .addFields(
                {
                    name: "Mystical Space Typhoon", value: `With the power of storms, prevent the target from casting spells and every attempt will cause them to take damage.`
                },
                {
                    name: "Raigeki", value: `Elemental powers course through your veins uncontrollably, deal big damage, but take recoil.`
                },
                {
                    name: "Damage Evaporation", value: `If you are attacked, the very moisture in the air reduces the damage.`
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
            setAdept(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setSummoner(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setDM(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setEA(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Adept"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)


        }
    } catch {
        console.log("Stopped listening")
    }

}

async function setSummoner(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {

    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Ritual Summoner")
            .setImage('https://static.wikia.nocookie.net/yugioh/images/4/4a/AleistertheInvoker-SHVA-EN-ScR-1E.png/revision/latest/scale-to-width-down/300?cb=20180817184137')
            .setDescription(`**The Ritual Summoners** \n
            Your power was something you worked hard to develop, you studied how to summon duel monsters to your aid.
    \n
    Branches into the **Necromancer (spooky)** and the **Evoker (non-spooky)**`)
            .addFields(
                {
                    name: "Summoning Ritual", value: `If 5 members of your faction are present for this command within 10 seconds, +100 exp to all present members. **1 Week Cooldown**`
                },
                {
                    name: "Monster Reborn", value: `If your summon dies, it doesn't!`
                },
                {
                    name: "Polymerization", value: `You begin to dabble with the anatomy and physiology of monsters of different genuses, fuse two of your summons into one big summon.`
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
            setAdept(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setSummoner(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setDM(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setEA(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Summoner"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Stopped listening")
    }
}

async function setDM(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {
    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Dark Magician")
            .setDescription(`**The Dark Magician** \n
            Something dark defiles the power within you. The **Dark Magician** possesses powers akin to the monsters of old. Perhaps your body, mind and soul were unwittingly sold to darker forces, granting you abilities beyond mortal comprehension. Or maybe you deliberately sought after this might of your own accord. \n
    With attacks like *Dark Magic Attack* and *Dark Magic Inheritance*, those who wield this power are often found wandering in isolation because of it's dark and uncontrollable nature. The question remains still, what *kind* of dark powers do you possess and where *do* they come from? And will you use them for good or for something more sinister?
    \n
    Branches into the **Magician of Black Chaos** and the **Hemomancer**`)
            .setImage('https://ygoprodeck.com/pics/46986414.jpg')
            .addFields(
                {
                    name: "Dark Magic Attack", value: `Steal (1-3) point(s) from any random user. **96 Hour Cooldown**`
                },
                {
                    name: "Dark Magic Inheritance", value: `Increase XP gain by 200. **48 Hour Cooldown**`
                },
                {
                    name: "Crush Card Virus", value: `Constrict your target with a wave of dark tendrils. On their turn, they must roll to see if they can even take their turn.`
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
            setAdept(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setSummoner(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setDM(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setEA(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Dark Mage"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Stopped listening")
    }
}

async function setEA(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {
    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Egyptian God Acolyte")
            .setImage('https://ygoprodeck.com/pics/61528025.jpg')
            .setDescription(`**The Egyptian God Acolyte** \n
            You were gifted your powers by **${god}** himself. While others are obsessed with personal power and glory, your direct connection with the gods themselves lend favor to the entire faction and allows you to call down the fury of **${god}** (mood permitting). \n
             Patience, perseverance and prayer are your weapons. Carry them as a seal upon your heart as you go to battle everyday.\n
            Branches into the **Egyptian God Oracle** and the **Egyptian God Zealot**`)
            .addFields(
                {
                    name: `${god}'s Blessing`, value: `Choose a guildmate, on their next successful daily roll, increase the number of points gained by (0-2). **48 Hour Cooldown**`
                },
                {
                    name: "The Power of Prayer", value: `Increase the maximum XP gain earned by your guild's $daily by 5. Passive`
                },
                {
                    name: "Monster Reborn", value: `If a guildmate's (not yours) points were stolen, recover those points. **96 Hour Cooldown**`
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
            setAdept(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setSummoner(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setDM(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setEA(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Egyptian God Acolyte"
            console.log("meme")
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Something went wrong")
    }
}
