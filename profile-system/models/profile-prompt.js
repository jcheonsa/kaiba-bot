const { prefix, lolRole, smashRole, dbfzRole, tftRole, animeRole, arkRole, shootRole, dndRole, kpopRole, partyRole } = require('../../config.json')
const Discord = require('discord.js')

// handles all changes to user roles
module.exports.rolesOperator = async (message) => {

    const member = message.member

    let roleEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Your move. **Separate multiple entries with a comma!**")
        .addField(
            `1) Even Remotely Interested in League of Legends`,
            `If you're interested in League or Legends and want to be pinged whenever something's happening.`
        )
        .addField(
            `2) Smash Brothers - 19 y/o Party Games`,
            `For all things Smash. Also get pinged for netplay sessions! Melee, P+, and Ult friendly!`
        )
        .addField(
            `3) Fight Club - Fighting Games`,
            `Want to stay up-to-date with the latest news or get some matches in? This is the group to join!`
        )
        .addField(
            `4) TFT not LoL - Team Fight Tactics`,
            `Pretty much the League group but for TFT.`
        )
        .addField(
            `5) Eastern Excellence - Anime, Manga & Webtoons`,
            `Full disclosure: this will give you access to an exclusive channel where all things weeb goes on!`
        )
        .addField(
            `6) Dokutahs - Arknights`,
            `If you want to get connected with the fellow doctors in the server or are just interested in the game, join this group!`
        )
        .addField(
            `7) Shootie & Poopie - Literally all FPS games and StarCraft II`,
            `Including but not limited to: Overwatch, Apex Legends, Destiny, and Starcraft.`
        )
        .addField(
            `8) Dungeons & Dragons`,
            `Joining this group will connect you with fellow adventurers. Here's hoping we can start up another in-server campaign!`
        )
        .addField(
            `9) K-Pop`,
            `This is exactly what it sounds like! Discuss, share, shitpost, or whatever!`
        )
        .addField(
            `10) Party time`,
            `Get pinged for whenever there's a movie night, game night, or whatever server-wide memes are going on!`
        )
        .setTitle("What role would you like to join?", `\u200b`)
        .setFooter(`type ${prefix}cancel to end your turn.`)
        .setTimestamp();
    let embedMSG = await message.channel.send(roleEmbed);
    let filter = (m) => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 30000,
    });

    let results = query.first().content;

    if (results === `${prefix}cancel`) {
        return (message.reply("Utility aborted."))
    }

    if (results.includes("1")) {
        if (member.roles.cache.has(lolRole)) {
            member.roles.remove(lolRole)
                .then(message.channel.send("Removed you from this group."));
        } else {
            member.roles.add(lolRole)
                .then(message.reply("added you to the League group, keep your mental!"));
        }
    }
    if (results.includes("2")) {
        if (member.roles.cache.has(smashRole)) {
            member.roles.remove(smashRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(smashRole)
                .then(message.reply("added you to the Smash Bros. group!"));
        }
    }
    if (results.includes("3")) {
        if (member.roles.cache.has(dbfzRole)) {
            member.roles.remove(dbfzRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(dbfzRole)
                .then(message.reply("added you to the fighting games group, fight on!"));
        }
    }
    if (results.includes("4")) {
        if (member.roles.cache.has(tftRole)) {
            member.roles.remove(tftRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(tftRole)
                .then(message.reply("added you to the TFT group, poo poo!"));
        }
    }
    if (results.includes("5")) {
        if (member.roles.cache.has(animeRole)) {
            member.roles.remove(animeRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(animeRole)
                .then(message.reply("added you to the manga & webtoons group!"));
        }
    }
    if (results.includes("6")) {
        if (member.roles.cache.has(arkRole)) {
            member.roles.remove(arkRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(arkRole)
                .then(message.reply("welcome, Doctor!"));
        }
    }
    if (results.includes("7")) {
        if (member.roles.cache.has(shootRole)) {
            member.roles.remove(shootRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(shootRole)
                .then(message.reply("added you to the shooters group, better hit your shots!"));
        }
    }
    if (results.includes("8")) {
        if (member.roles.cache.has(dndRole)) {
            member.roles.remove(dndRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(dndRole)
                .then(message.reply("added you to the DnD group, prithee be careful!"));
        }
    }
    if (results.includes("9")) {
        if (member.roles.cache.has(kpopRole)) {
            member.roles.remove(kpopRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(kpopRole)
                .then(message.reply("added you to the K-Pop group!"));
        }
    }
    if (results.includes("10")) {
        if (member.roles.cache.has(partyRole)) {
            member.roles.remove(partyRole)
                .then(message.channel.send("Removed you from this gorup."));
        } else {
            member.roles.add(partyRole)
                .then(message.reply("added you to the party group, hope to see you hanging some time!"));
        }
    }
    else {
        message.channel.send("I end my turn.")
    }
}