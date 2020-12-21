const Discord = require('discord.js');
const jobadvProc = require('../../models/class-handler')

module.exports = {

    async secondRange(client, guildID, userID, lvlChannel, god) {

        try {

            const oneEmoji = "1️⃣"
            const twoEmoji = "2️⃣"
            const threeEmoji = "3️⃣"
            const fourEmoji = "4️⃣"
            const intEmoji = client.emojis.cache.find(emoji => emoji.name === "Futaba");
            const emojis = [oneEmoji, twoEmoji, threeEmoji, fourEmoji]

            var lvl2Embed = new Discord.MessageEmbed()
                .setAuthor("Ranger Second Advancement")
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

            setArcher(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)

        } catch {
            console.log("Stopped listening")
        }
    }
}

async function setArcher(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {

    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Archer")
            .setImage('https://static.wikia.nocookie.net/yugioh/images/3/37/ArcaneArcheroftheForest-DR2-EN-C-UE.png/revision/latest?cb=20160531181656')
            .setDescription(`As those around you took on the path of the warrior or mage, you were mocked for your prowess with the bow. They think the bow a cowardly tool that defiles the meaning of true combat - affording no honor to it nor the wielder. \n
            With that said, your drive to prove them wrong lies in every arrow you nock between your fingers. By utilizing the power of the bow, you hope that ${god} himself will grant you the favor and strength to defend your name and your honor; ${god}'s name and ${god}'s honor.
    \n
    Branches into the **Hunter** and **Arcane Archer**`)
            .addFields(
                {
                    name: "Imbued Arrows", value: `Your Egyptian God blesses your arrows with their Egyptian God powers. Big damage.`
                },
                {
                    name: "Internal Bleeding", value: `All damage you deal will cause your target to bleed, will deal an additional roll of damage.`
                },
                {
                    name: "Approaching Velocity", value: `If some guy try to run, you run faster.`
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
            setArcher(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setGun(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setTrap(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setRider(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Archer"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Stopped listening")
    }

}

async function setGun(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {

    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Gunslinger")
            .setImage('https://cdn.discordapp.com/attachments/786855832762843176/788297551345352704/MagicalMusketeerKidbrave-SPWA-EN-SR-1E.png')
            .setDescription(`**Release the lock. Pull the hammer. Press the trigger.** \n
            Modern weaponry distinguishes you from other martial or magical classes.
    \n
    Branches into the **Outlaw** and the **Marksman**`)
            .addFields(
                {
                    name: "Bullet Time", value: `You hold your breath and focus. You now attack twice for every normal basic attack.`
                },
                {
                    name: "Quickdraw", value: `Lay down a trap, if your target attempts to basic attack, roll to see if you interrupt and attack them.`
                },
                {
                    name: "Gunslinger Brand", value: `You're kind of a big deal around here. Fame scales your points gain.`
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
            setArcher(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setGun(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setTrap(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setRider(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Gunslinger"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Stopped listening")
    }
}

async function setTrap(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {
    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("The Trapper")
            .setDescription(`**The Trapper** \n
    Branches into the **Toxicologist** and the **Trap Master**`)
            .setImage('https://static.wikia.nocookie.net/yugioh/images/3/3a/TrapMaster-SKE-EN-C-1E.jpg/revision/latest/scale-to-width-down/300?cb=20070831020522')
            .addFields(
                {
                    name: "Mark of Impurity", value: `Mark a target as impure. Target takes extra damage from all sources.`
                },
                {
                    name: "Magic Jammer", value: `Lay down a trap, if the target attempts to use a skill or spell, they first roll and/or take damage or skip turn.`
                },
                {
                    name: "Paralyze", value: `Paralyze the target and prevent them from taking their turn all together.`
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
            setArcher(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setGun(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setTrap(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setRider(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Trapper"
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Stopped listening")
    }
}

async function setRider(adReaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel) {
    try {
        lvl2Embed.setColor("RANDOM")
            .setTitle("Raider")
            .setImage('https://static.wikia.nocookie.net/yugioh/images/9/9d/Athena-SR05-EN-C-1E.png/revision/latest?cb=20180120012001')
            .setDescription(`**Raiden** \n
            Branches into the **Spirit Shifter** and the **Beast Rider**`)
            .addFields(
                {
                    name: `${god}'s Blood Pact`, value: `Receive a Spirit Beast Guardian. It's form depends on your Egyptian God. Daily XP/Points gain up.`
                },
                {
                    name: "Maim", value: `You and your Spirit Beast attack in tandem, mortally wounding and debuffing the target. This debuff cannot be cured for 24 hours.`
                },
                {
                    name: "Spirit Beast Counter Attack", value: `Your Spirit Beast will take damage for you.`
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
            setArcher(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[1]) {
            lvl2Embed.fields = [];
            setGun(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[2]) {
            lvl2Embed.fields = [];
            setTrap(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === emojis[3]) {
            lvl2Embed.fields = [];
            setRider(reaction, lvl2Embed, emojis, god, guildID, userID, lvlChannel)
        } else if (reaction.emoji.name === "✅") {
            var job = "Beast Tamer"
            console.log("meme")
            jobadvProc.setClass(lvlChannel, job, guildID, userID)

        }
    } catch {
        console.log("Something went wrong")
    }
}
