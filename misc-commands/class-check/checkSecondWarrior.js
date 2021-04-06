const Discord = require('discord.js');
const { raRole, obRole, slRole } = require('../../config.json')

module.exports = {

    async secondWarrior(message) {

        try {


            const { client } = message
            const member = message.member

            const oneEmoji = "1️⃣"
            const twoEmoji = "2️⃣"
            const threeEmoji = "3️⃣"
            const fourEmoji = "4️⃣"
            const intEmoji = client.emojis.cache.find(emoji => emoji.name === "Futaba");
            const emojis = [oneEmoji, twoEmoji, threeEmoji, fourEmoji]

            if (member.roles.cache.has(raRole)) {
                var god = "Ra"
            }
            if (member.roles.cache.has(obRole)) {
                var god = "Obelisk"
            }
            if (member.roles.cache.has(slRole)) {
                var god = "Slifer"
            }

            var lvl2Embed = new Discord.MessageEmbed()
                .setAuthor("Mage Second Advancement")
                .setDescription(`Use the reactions to navigate through the advancement menu. \n
            Please wait for the reactions to load slowly before clicking. They take some time. \n
            There are 4 branches for your class. Look through each page, and when you decide on the one you want, press the "✅".`)

            let confirm = await message.channel.send(lvl2Embed)

            await confirm.react(intEmoji)

            let reactionFilter = (reaction, user) =>
                user.id === message.author.id && !user.bot;
            let reaction = (
                await confirm.awaitReactions(reactionFilter, {
                    max: 1,
                })
            ).first();

            setGuard(reaction, lvl2Embed, emojis, god, message)

        } catch {

            console.log("Stopped listening")

        }
    }
}

async function setGuard(adReaction, lvl2Embed, emojis, god, message) {

    try {

        lvl2Embed.setColor("RANDOM")
            .setTitle("The Guardian")
            .setImage('https://static.wikia.nocookie.net/yugioh/images/e/e8/GuardianofFelgrand-SR02-EN-C-1E.png/revision/latest/scale-to-width-down/459?cb=20160706182319')
            .setDescription(`**A good defense is a good offense.** The Guardian's faith is in the more pragmatic things - confident in what they can directly interact with. Through hardhsip, pain and discipline, you too have built up your reputation as a reliabl and indomitable force. \n
            Towering over the offensive lines, keeping oppressive fire at bay, and soaking in missiles; you are a mountain that will overwhelm your opponents. \n
            Branches into the **Sentinel** and the **Tower**`)
            .addFields(
                {
                    name: "Swords of Revealing Light", value: `Diplomacy reduces incoming damage to 1/10th for the next 2 hits.`
                },
                {
                    name: "My Body as a Shield", value: `Redirect damage taken by ally to you.`
                },
                {
                    name: "Block Attack", value: `Completely blocks 1 attack.`
                },
            )
            .setFooter(`Page 1 of 4`)

        adReaction.message.edit(lvl2Embed)

        let confirm = await adReaction.message.edit(lvl2Embed)

        await confirm.react(emojis[0])
        await confirm.react(emojis[1])
        await confirm.react(emojis[2])
        await confirm.react(emojis[3])

        let reactionFilter = (reaction, user) =>
            user.id === message.author.id && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();

        if (reaction.emoji.name === emojis[0]) {
            lvl2Embed.fields = [];
            setGuard(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setMA(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setWM(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setEA(adReaction, lvl2Embed, emojis, god, message)
        }

    } catch {

        console.log("Stopped listening")

    }

}

async function setMA(adReaction, lvl2Embed, emojis, god, message) {

    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Martial Artist")
            .setImage('https://static.wikia.nocookie.net/yugioh/images/7/7b/ComboMaster-CDIP-EN-R-1E.jpg/revision/latest?cb=20070219022112')
            .setDescription(`You have embarked on a long journey to hone your body and master the martial arts of your ancestors.\n
       Though the world has moved on to equip the weak with gunpowder, duel monsters, and sorcery, you represent an ever-present guardian force that relies on the mastery of the human body.
\n 
Branches into the **The Body Cultivator**, the **The Sword Cultivator**, and the **Daoist Cultivator**`)
            .addFields(
                {
                    name: "Trigram Fist of the Fiery Phoenix", value: `A four-punch combo that increases in strength with each successive strike. The last strike lights the air around your fist on fire to land a fiery blow.`
                },
                {
                    name: "Fleeting Shadow", value: `You move your feet in rapid succession, confusing your enemy and increasing your evasion.`
                },
            )
            .setFooter(`Page 2 of 4`)
        adReaction.message.edit(lvl2Embed)

        let confirm = await adReaction.message.edit(lvl2Embed)
        await confirm.react(emojis[0])
        await confirm.react(emojis[1])
        await confirm.react(emojis[2])
        await confirm.react(emojis[3])

        let reactionFilter = (reaction, user) =>
            user.id === message.author.id && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();

        if (reaction.emoji.name === emojis[0]) {
            lvl2Embed.fields = [];
            setGuard(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setMA(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setWM(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setEA(adReaction, lvl2Embed, emojis, god, message)
        }

    } catch {

        console.log("Stopped listening")

    }
}

async function setWM(adReaction, lvl2Embed, emojis, god, message) {

    try {

        lvl2Embed.setColor("RANDOM")
            .setTitle("The Weapon Master")
            .setDescription(`**Jack of all trades, master of none.** The weaponmaster is a whirlwind of blades, staves, arrows, and bolts. \n
        An axe carved deep into a man's head, a sword twisted in the belly of an assassin, an arrow blooming forth from a monster's head, or even a spoon down someone's throat. \n
        Beware the Weapons Master, for even the humblest of objects can become the deadliest of weapons in the right hands. \n
        Branches into the **Specialist**`)
            .setImage('https://static.wikia.nocookie.net/yugioh/images/f/f9/TheHunterwith7Weapons-LOD-NA-C-1E.jpg/revision/latest?cb=20061119233723')
            .addFields(
                {
                    name: "Offensive Stance", value: `You see an opening and want to press into it rather recklessly, increasing damage but reducing your defense.`
                },
                {
                    name: "Patient Bait", value: `Taunts target while in a neutral stance, prepare for return damage (reduces damage taken by 10th), when attacked, redirect 25% of their attack or 33% of your attack (whichever is lower) back at the opponent.`
                },
                {
                    name: "Paced Attack", value: `Attack with 30% of regular attack damage (1-6) times.`
                },
                {
                    name: "Improvisation", value: `Your training and understanding of a plethora of martial weapons allows you to adapt to combat quickyl ,you are able to switch your offense and defnse.`
                },
            )
            .setFooter(`Page 3 of 4`)
        adReaction.message.edit(lvl2Embed)
        let confirm = await adReaction.message.edit(lvl2Embed)
        await confirm.react(emojis[0])
        await confirm.react(emojis[1])
        await confirm.react(emojis[2])
        await confirm.react(emojis[3])

        let reactionFilter = (reaction, user) =>
            user.id === message.author.id && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();

        if (reaction.emoji.name === emojis[0]) {
            lvl2Embed.fields = [];
            setGuard(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setMA(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setWM(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setEA(adReaction, lvl2Embed, emojis, god, message)
        }

    } catch {

        console.log("Stopped listening")

    }
}

async function setEA(adReaction, lvl2Embed, emojis, god, message) {

    try {

        lvl2Embed.setColor("RANDOM")
            .setTitle("The Egyptian God Crusader")
            .setImage('https://static.wikia.nocookie.net/yugioh/images/a/a5/PaladinofFelgrand-OP03-EN-SR-UE.png/revision/latest/scale-to-width-down/300?cb=20170330112958')
            .setDescription(`**The Crusader** \n
            You were gifted your powers by **${god}** himself. While others are obsessed with personal power and glory, your direct connection with the gods themselves lend favor to the entire faction and allows you to call down the fury of **${god}** (mood permitting). \n
             Patience, perseverance and prayer are your weapons. Carry them as a seal upon your heart as you go to battle everyday.\n
            Branches into the **Egyptian God Harbinger** and the **Egyptian God Champion**`)
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

        let reactionFilter = (reaction, user) =>
            user.id === message.author.id && !user.bot;
        let reaction = (
            await confirm.awaitReactions(reactionFilter, {
                max: 1,
            })
        ).first();

        if (reaction.emoji.name === emojis[0]) {
            lvl2Embed.fields = [];
            setGuard(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setMA(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setWM(adReaction, lvl2Embed, emojis, god, message)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setEA(adReaction, lvl2Embed, emojis, god, message)
        }

    } catch {

        console.log("Something went wrong")

    }
}
