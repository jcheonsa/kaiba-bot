const Discord = require('discord.js')
const profileHandler = require("../models/profile-handler");
const rO = require('../models/profile-prompt')

module.exports.profile = async (message, guildID, userID, user) => {
    let imgEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("What would you like to customize?")
        .addField(
            `1) Description 1`,
            `Type what you want on the first line of your banner.`
        )
        .addField(
            `2) Description 2`,
            `Type what you want on the second line of your banner.`
        )
        .addField(
            `3) Description 3`,
            `Type what you want on the third line of your banner.`
        )
        .addField(
            `4) Background`,
            `Link a URL to an image to make it the background of your banner.`
        )
        .addField(
            `5) Banner Color`,
            `Change the color of your profile banner.`
        )
        .addField(
            `6) Manage Badges/Roles`,
            `Join a group and/or add a badge to your profile!`
        )
        .setTitle("Banner Customizer", `\u200b`)
        .setFooter(`type ${prefix}cancel to abort this process at any time.`)
        .setTimestamp();
    let embedMSG = await message.channel.send(imgEmbed);
    let filter = (m) => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 30000,
    });
    let results = query.first().content;
    if (query.first().content === `${prefix}cancel`) {
        return message.reply("Utility aborted.");
    } else {
        if (results === "1") {
            profileHandler.addDesc1(message, guildID, userID, user);
        }
        if (results === "2") {
            profileHandler.addDesc2(message, guildID, userID, user);
        }
        if (results === "3") {
            profileHandler.addDesc3(message, guildID, userID, user);
        }
        if (results === "4") {
            profileHandler.addBG(message, guildID, userID, user);
        }
        if (results === "5") {
            profileHandler.addBGColor(message, guildID, userID, user);
        }
        if (results === "6") {
            rO.rolesOperator(message)
        }
    }
}
